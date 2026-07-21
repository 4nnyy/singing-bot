const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder().setName('skip').setDescription('Current gaana skip karo'),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) {
      return interaction.reply({ content: '❌ Abhi kuch bhi nahi baj raha!', ephemeral: true });
    }
    const track = queue.currentTrack;
    const success = queue.node.skip();
    return interaction.reply(success ? `⏭️ Skip kar diya: **${track.title}**` : '❌ Skip nahi ho paya.');
  },
};
