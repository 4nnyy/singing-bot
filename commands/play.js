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

    const nodeOptions = {
      metadata: interaction,
      selfDeaf: true,
      volume: 80,
      leaveOnEmpty: true,
      leaveOnEmptyCooldown: 300000,
      leaveOnEnd: false,
      bufferingTimeout: 5000,
      // ---- Free hosting ke limited CPU pe glitching kam karne ke liye ----
      bitrate: 64000,
    };

    try {
      // Pehle top result try karo
      const { track } = await player.play(channel, query, { nodeOptions });
      await interaction.editReply(`🎶 Queue mein add ho gaya: **${track.title}**`);
    } catch (err) {
      console.error('Top result fail hua, alternate results try kar rahe hain:', err.message);

      // ---- Auto-retry: agar pehla result extract nahi hua, agle results try karo ----
      try {
        const searchResult = await player.search(query, { requestedBy: interaction.user });
        if (!searchResult || !searchResult.tracks.length) {
          return interaction.editReply(`❌ Ye play nahi ho paya: ${err.message}`);
        }

        let played = false;
        // Pehle result already fail ho chuka hai, isliye 2nd se try karte hain (max 3 attempts)
        for (let i = 1; i < Math.min(searchResult.tracks.length, 4) && !played; i++) {
          const candidate = searchResult.tracks[i];
          try {
            const { track } = await player.play(channel, candidate.url, { nodeOptions });
            await interaction.editReply(`🎶 Queue mein add ho gaya: **${track.title}** *(alternate match)*`);
            played = true;
          } catch (retryErr) {
            console.error(`Alternate #${i} bhi fail hua:`, retryErr.message);
          }
        }

        if (!played) {
          await interaction.editReply(`❌ Ye gaana kisi bhi source se play nahi ho paya. Koi aur gaana try karo.`);
        }
      } catch (searchErr) {
        console.error(searchErr);
        await interaction.editReply(`❌ Ye play nahi ho paya: ${err.message}`);
      }
    }
  },
};
