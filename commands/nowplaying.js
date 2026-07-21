const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder().setName('nowplaying').setDescription('Abhi kya baj raha hai dekho'),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) {
      return interaction.reply({ content: '❌ Kuch bhi baj nahi raha!', ephemeral: true });
    }

    const track = queue.currentTrack;
    const bar = queue.node.createProgressBar();

    const embed = new EmbedBuilder()
      .setColor('#a855f7')
      .setTitle('🎧 Now Playing')
      .setDescription(`**[${track.title}](${track.url})**\n\n${bar}`)
      .setThumbnail(track.thumbnail)
      .addFields({ name: 'Requested By', value: `${track.requestedBy}`, inline: true });

    return interaction.reply({ embeds: [embed] });
  },
};
