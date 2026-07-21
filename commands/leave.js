const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder().setName('leave').setDescription('Bot ko voice channel se nikal do'),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply({ content: '❌ Main kisi voice channel mein hoon hi nahi!', ephemeral: true });
    queue.delete();
    return interaction.reply('👋 Bye bye! Voice channel se nikal gaya.');
  },
};
