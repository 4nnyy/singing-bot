const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder().setName('queue').setDescription('Poori queue dekho'),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) {
      return interaction.reply({ content: '❌ Queue khali hai!', ephemeral: true });
    }

    const tracks = queue.tracks.toArray();
    const current = queue.currentTrack;
    const upcoming =
      tracks
        .slice(0, 10)
        .map((t, i) => `**${i + 1}.** ${t.title} — \`${t.duration}\``)
        .join('\n') || 'Koi aur track queue mein nahi hai.';

    const embed = new EmbedBuilder()
      .setColor('#a855f7')
      .setTitle('🎶 AnnySing Queue')
      .setDescription(
        `**Ab baj raha hai:**\n${current.title} — \`${current.duration}\`\n\n**Aage:**\n${upcoming}`,
      )
      .setFooter({ text: `Total tracks: ${tracks.length + 1}${tracks.length > 10 ? ' (sirf pehle 10 dikhaye)' : ''}` });

    return interaction.reply({ embeds: [embed] });
  },
};
