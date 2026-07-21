const { SlashCommandBuilder } = require('discord.js');
const { useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loop mode set karo')
    .addStringOption((opt) =>
      opt
        .setName('mode')
        .setDescription('Loop mode chuno')
        .setRequired(true)
        .addChoices(
          { name: 'Off', value: 'off' },
          { name: 'Track (ek gaana repeat)', value: 'track' },
          { name: 'Queue (poori queue repeat)', value: 'queue' },
        ),
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply({ content: '❌ Kuch bhi baj nahi raha!', ephemeral: true });

    const mode = interaction.options.getString('mode', true);
    const map = { off: QueueRepeatMode.OFF, track: QueueRepeatMode.TRACK, queue: QueueRepeatMode.QUEUE };
    queue.setRepeatMode(map[mode]);

    const labels = { off: 'OFF', track: 'TRACK 🔂', queue: 'QUEUE 🔁' };
    return interaction.reply(`Loop mode: **${labels[mode]}**`);
  },
};
