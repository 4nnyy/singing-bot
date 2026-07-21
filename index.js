require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {
  Client,
  GatewayIntentBits,
  Collection,
  EmbedBuilder,
  ActivityType,
} = require('discord.js');
const { Player } = require('discord-player');
const { YoutubeiExtractor } = require('discord-player-youtubei');
const { DefaultExtractors } = require('@discord-player/extractor');
// FFmpeg binary ka path set kar rahe hain -> manually install nahi karna padega
process.env.FFMPEG_PATH = require('ffmpeg-static');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
client.commands = new Collection();
// ---------- Saare commands folder se auto-load karo ----------
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((f) => f.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}
// ---------- Player Setup ----------
const player = new Player(client);
(async () => {
  // Robust YouTube extractor -> link se play aur naam se search dono handle karta hai
  await player.extractors.register(YoutubeiExtractor, {});
  // Baaki sources (Spotify bridge, SoundCloud, Apple Music, Vimeo, local files)
  await player.extractors.loadMulti(DefaultExtractors);
  console.log('✅ Extractors load ho gaye — YouTube, Spotify, SoundCloud sab ready.');
})();
// ---------- Player Events (premium feel dene ke liye) ----------
player.events.on('playerStart', (queue, track) => {
  const embed = new EmbedBuilder()
    .setColor('#a855f7')
    .setTitle('🎧 Ab Baj Raha Hai — AnnySing')
    .setDescription(`**[${track.title}](${track.url})**`)
    .setThumbnail(track.thumbnail)
    .addFields(
      { name: 'Duration', value: track.duration || 'N/A', inline: true },
      { name: 'Requested By', value: `${track.requestedBy}`, inline: true },
    )
    .setFooter({ text: 'AnnySing 🎶 Premium Sound Experience' });
  queue.metadata?.channel?.send({ embeds: [embed] }).catch(() => {});
});
player.events.on('audioTrackAdd', (queue, track) => {
  queue.metadata?.channel?.send(`✅ Queue mein add ho gaya: **${track.title}**`).catch(() => {});
});
player.events.on('emptyQueue', (queue) => {
  queue.metadata?.channel
    ?.send('✅ Queue khatam ho gayi! `/play` se kuch aur bajao ya `/autoplay` on karo.')
    .catch(() => {});
});
player.events.on('emptyChannel', (queue) => {
  queue.metadata?.channel?.send('👋 Voice channel khali ho gaya, main bhi nikal raha hoon...').catch(() => {});
});
player.events.on('playerError', (queue, error) => {
  console.error('Player error:', error);
  queue.metadata?.channel?.send(`❌ Playback error: ${error.message}`).catch(() => {});
});
player.events.on('error', (queue, error) => {
  console.error('General player error:', error);
});
// ---------- Discord Client Events ----------
client.once('ready', () => {
  console.log(`✅ ${client.user.tag} online hai! AnnySing ready to rock 🎶`);
  client.user.setActivity('/play | AnnySing', { type: ActivityType.Listening });
});
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    // discord-player v7: Player ab singleton nahi hai, isliye har command execution
    // ko context provide karna zaroori hai taaki useQueue/useMainPlayer hooks kaam karein
    await player.context.provide({ guild: interaction.guild }, () => command.execute(interaction));
  } catch (err) {
    console.error(err);
    const errorMsg = { content: '❌ Command chalate waqt error aa gaya!', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMsg).catch(() => {});
    } else {
      await interaction.reply(errorMsg).catch(() => {});
    }
  }
});
client.login(process.env.DISCORD_TOKEN);
