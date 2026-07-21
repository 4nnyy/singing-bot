require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((f) => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`🔄 ${commands.length} slash commands deploy ho rahe hain...`);

    // Agar GUILD_ID diya hai toh usi server mein turant deploy hoga (testing ke liye best)
    // Warna globally deploy hoga (live hone mein ~1 hour lag sakta hai)
    const route = process.env.GUILD_ID
      ? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
      : Routes.applicationCommands(process.env.CLIENT_ID);

    await rest.put(route, { body: commands });

    console.log('✅ Sab commands deploy ho gaye!');
  } catch (err) {
    console.error('❌ Deploy karte waqt error aaya:', err);
  }
})();
