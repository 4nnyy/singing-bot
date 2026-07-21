const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder().setName('pause').setDescription('Music pause karo'),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) {
      return interaction.reply({ content: '❌ Kuch bhi baj nahi raha!', ephemeral: true });
    }
    if (queue.node.isPaused()) {
      return interaction.reply({ content: '⏸️ Pehle se hi pause hai!', ephemeral: true });
    }
    queue.node.setPaused(true);
    return interaction.reply('⏸️ Pause kar diya!');
  },
};
