const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Music rokke queue clear karo aur bot ko disconnect karo'),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply({ content: '❌ Kuch bhi baj nahi raha!', ephemeral: true });
    queue.delete();
    return interaction.reply('⏹️ Stop kar diya, queue clear ho gayi!');
  },
};
