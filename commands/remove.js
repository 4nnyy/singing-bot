const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Queue se ek track hatao')
    .addIntegerOption((opt) =>
      opt.setName('position').setDescription('Queue position (1 se start)').setRequired(true).setMinValue(1),
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply({ content: '❌ Queue khali hai!', ephemeral: true });

    const pos = interaction.options.getInteger('position', true) - 1;
    const track = queue.tracks.at(pos);
    if (!track) return interaction.reply({ content: '❌ Ye position exist nahi karta!', ephemeral: true });

    queue.node.remove(track);
    return interaction.reply(`🗑️ Remove kar diya: **${track.title}**`);
  },
};
