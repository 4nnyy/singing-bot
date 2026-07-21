const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('help').setDescription('AnnySing ke saare commands dekho'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#a855f7')
      .setTitle('🎧 AnnySing — Commands List')
      .setDescription('Premium quality music bot with advanced features 🎶')
      .addFields(
        { name: '🎵 Playback', value: '`/play` `/pause` `/resume` `/stop` `/skip` `/leave`' },
        { name: '📜 Queue', value: '`/queue` `/nowplaying` `/shuffle` `/remove` `/seek`' },
        { name: '🔁 Modes', value: '`/loop` `/autoplay` `/volume`' },
        { name: '🎚️ Sound', value: '`/filter` — bassboost, 8D, nightcore, vaporwave, karaoke, normalizer, surround, treble' },
      )
      .setFooter({ text: 'AnnySing 🎶 Made for premium sound experience' });

    return interaction.reply({ embeds: [embed] });
  },
};
