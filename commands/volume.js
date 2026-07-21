const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Volume set karo (0-200)')
    .addIntegerOption((opt) =>
      opt.setName('level').setDescription('0 se 200 ke beech').setRequired(true).setMinValue(0).setMaxValue(200),
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply({ content: '❌ Kuch bhi baj nahi raha!', ephemeral: true });
    const level = interaction.options.getInteger('level', true);
    queue.node.setVolume(level);
    return interaction.reply(`🔊 Volume set kar diya: **${level}%**`);
  },
};
