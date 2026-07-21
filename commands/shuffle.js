const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder().setName('shuffle').setDescription('Queue shuffle karo'),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || queue.tracks.size < 2) {
      return interaction.reply({ content: '❌ Shuffle karne ke liye kam se kam 2 tracks queue mein chahiye!', ephemeral: true });
    }
    queue.tracks.shuffle();
    return interaction.reply('🔀 Queue shuffle kar di!');
  },
};
