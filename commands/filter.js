const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('filter')
    .setDescription('Audio filter lagao — premium enhanced sound ke liye')
    .addStringOption((opt) =>
      opt
        .setName('name')
        .setDescription('Filter chuno')
        .setRequired(true)
        .addChoices(
          { name: 'Bass Boost', value: 'bassboost' },
          { name: '8D Audio (surround feel)', value: '8D' },
          { name: 'Nightcore', value: 'nightcore' },
          { name: 'Vaporwave', value: 'vaporwave' },
          { name: 'Karaoke (vocal reduce)', value: 'karaoke' },
          { name: 'Normalizer (clean loudness)', value: 'normalizer' },
          { name: 'Surround', value: 'surrounding' },
          { name: 'Treble Boost', value: 'treble' },
          { name: 'Clear (sab filters hatao)', value: 'clear' },
        ),
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) {
      return interaction.reply({ content: '❌ Kuch bhi baj nahi raha!', ephemeral: true });
    }

    const choice = interaction.options.getString('name', true);

    if (choice === 'clear') {
      await queue.filters.ffmpeg.setFilters(false);
      return interaction.reply('🧹 Sab filters clear kar diye — original sound wapas!');
    }

    const active = queue.filters.ffmpeg.getFiltersEnabled();
    const isOn = active.includes(choice);
    await queue.filters.ffmpeg.toggle(choice);

    return interaction.reply(isOn ? `➖ Filter OFF: **${choice}**` : `➕ Filter ON: **${choice}** 🎧`);
  },
};
