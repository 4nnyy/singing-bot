const { SlashCommandBuilder } = require('discord.js');
const { useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autoplay')
    .setDescription('Autoplay on/off karo (queue khatam hone par related gaane khud bajenge)'),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply({ content: '❌ Kuch bhi baj nahi raha!', ephemeral: true });

    const isOn = queue.repeatMode === QueueRepeatMode.AUTOPLAY;
    queue.setRepeatMode(isOn ? QueueRepeatMode.OFF : QueueRepeatMode.AUTOPLAY);

    return interaction.reply(
      isOn ? '⏹️ Autoplay OFF kar diya.' : '♾️ Autoplay ON! Queue khatam hote hi related gaane khud bajenge.',
    );
  },
};
