const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription('Track mein kisi specific second pe jao')
    .addIntegerOption((opt) =>
      opt.setName('seconds').setDescription('Kitne second pe jaana hai').setRequired(true).setMinValue(0),
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) {
      return interaction.reply({ content: '❌ Kuch bhi baj nahi raha!', ephemeral: true });
    }
    const seconds = interaction.options.getInteger('seconds', true);
    await queue.node.seek(seconds * 1000);
    return interaction.reply(`⏩ Seek kar diya: **${seconds}s**`);
  },
};
