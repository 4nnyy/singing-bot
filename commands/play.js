const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('YouTube link ya song name se gaana bajao')
    .addStringOption((opt) =>
      opt
        .setName('query')
        .setDescription('Song ka naam ya YouTube/Spotify/SoundCloud link')
        .setRequired(true),
    ),
  async execute(interaction) {
    const channel = interaction.member?.voice?.channel;
    if (!channel) {
      return interaction.reply({ content: '❌ Pehle kisi voice channel mein join karo!', ephemeral: true });
    }

    await interaction.deferReply();
    const player = useMainPlayer();
    const query = interaction.options.getString('query', true);

    try {
      const { track } = await player.play(channel, query, {
        nodeOptions: {
          metadata: interaction,
          selfDeaf: true,
          volume: 80,
          leaveOnEmpty: true,
          leaveOnEmptyCooldown: 300000,
          leaveOnEnd: false,
          bufferingTimeout: 5000,
        },
      });

      await interaction.editReply(`🎶 Queue mein add ho gaya: **${track.title}**`);
    } catch (err) {
      console.error(err);
      await interaction.editReply(`❌ Ye play nahi ho paya: ${err.message}`);
    }
  },
};
