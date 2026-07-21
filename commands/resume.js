const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder().setName('resume').setDescription('Music wapas resume karo'),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) {
      return interaction.reply({ content: '❌ Kuch bhi baj nahi raha!', ephemeral: true });
    }
    if (!queue.node.isPaused()) {
      return interaction.reply({ content: '▶️ Pehle se hi baj raha hai!', ephemeral: true });
    }
    queue.node.setPaused(false);
    return interaction.reply('▶️ Resume kar diya!');
  },
};
