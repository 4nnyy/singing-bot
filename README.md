# 🎧 AnnySing — Premium Discord Music Bot

High quality Discord music bot: YouTube link se play, song name se search & play, autoplay,
audio filters (bassboost, 8D, nightcore, vaporwave...), queue system, loop, shuffle, aur bhi bahut kuch.

> **Ek honest baat pehle:** Literal "Dolby Atmos" Discord voice pe possible nahi hai — wo ek
> spatial-audio hardware format hai jo Discord support hi nahi karta. Lekin ye bot maximum
> possible quality deta hai: best-available source audio + enhancement filters (bass boost,
> 8D surround-feel, normalizer). Real quality ka sabse bada factor tumhare **Discord server ki
> voice channel bitrate** hai — niche "Best Audio Quality" section mein bataya hai kaise max karein.

---

## ✅ Features

- `/play` — YouTube link **ya** song name, dono se play (auto-detect)
- Autoplay — queue khatam hote hi related gaane khud bajte hain
- Audio filters — bassboost, 8D, nightcore, vaporwave, karaoke, normalizer, surround, treble
- Full queue management — skip, pause, resume, shuffle, remove, seek, loop
- Volume control (0–200%)
- Premium embeds — thumbnail, progress bar, requested-by ke saath
- Auto-reconnect handling & clean error messages

---

## 📋 Requirements

1. **Node.js v20 ya usse upar** (v22 LTS recommended) — [nodejs.org](https://nodejs.org) se download karo
2. Ek Discord account
3. Bot ko chalane ke liye ek machine jo 24/7 on rahe (apna PC, ya niche diye hosting options)

---

## 🤖 Step 1: Discord Bot Banao

1. [Discord Developer Portal](https://discord.com/developers/applications) pe jao aur login karo
2. **New Application** pe click karo, naam do "AnnySing"
3. Left sidebar mein **Bot** tab pe jao
4. **Reset Token** pe click karke token copy kar lo (ye kisi ko mat dena!)
5. Neeche **Privileged Gateway Intents** section mein kuch enable karne ki zaroorat nahi hai
   (ye bot sirf slash commands + voice use karta hai, message content nahi padhta)
6. Left sidebar mein **General Information** se apni **Application ID** (Client ID) copy kar lo

---

## ⚙️ Step 2: Install & Setup

```bash
# Project folder mein jao
cd annysing-bot

# Dependencies install karo
npm install
```

`.env.example` file ko `.env` naam se copy karo aur usme apna token/IDs bharo:

```bash
cp .env.example .env
```

```
DISCORD_TOKEN=tumhara_bot_token
CLIENT_ID=tumhari_application_id
GUILD_ID=tumhare_test_server_ki_id   # optional, testing ke liye
```

> `GUILD_ID` dene se commands turant us server mein aa jaate hain (testing ke liye best).
> Nahi doge toh commands globally deploy honge — live hone mein ~1 hour lag sakta hai.

---

## 🚀 Step 3: Bot Ko Invite Karo

Ye URL browser mein kholo (`YOUR_CLIENT_ID` apni Application ID se replace karo):

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=3197504&scope=bot%20applications.commands
```

Ye URL bot ko `View Channels`, `Send Messages`, `Embed Links`, `Connect`, `Speak` permissions
ke saath, `applications.commands` scope ke saath invite karta hai — commands ke liye zaroori hai.

---

## ▶️ Step 4: Commands Deploy Karo & Bot Start Karo

```bash
# Slash commands ko Discord pe register karo (ye sirf tab dobara chalao jab koi naya command add karo)
npm run deploy

# Bot start karo
npm start
```

Console mein "✅ ... online hai!" dikhega toh bot ready hai. Discord mein `/play` type karke try karo!

---

## 🔊 Best Audio Quality Tips

1. **Voice channel bitrate max karo:** Channel Settings → Overview → **Bitrate** slider ko
   max tak le jao. Free server pe 96kbps tak, aur Boosted server pe 128–384kbps tak mil sakta hai.
   Ye single sabse bada factor hai audio quality ke liye.
2. Bot ke `/filter normalizer` se loudness consistent rehti hai, `/filter bassboost` se
   punchy sound milti hai.
3. Stable internet aur ek machine jo overload na ho — warna audio robotic/crackly lag sakta hai.

---

## 📜 Commands List

| Command | Kaam |
|---|---|
| `/play <query>` | YouTube link ya song name se play/queue |
| `/skip` | Current gaana skip |
| `/pause` / `/resume` | Pause/resume |
| `/stop` | Queue clear + disconnect |
| `/leave` | Voice channel se nikal jao |
| `/queue` | Poori queue dikhao |
| `/nowplaying` | Progress bar ke saath current track |
| `/volume <0-200>` | Volume set karo |
| `/loop <off/track/queue>` | Repeat mode |
| `/autoplay` | Autoplay on/off |
| `/filter <name>` | Audio filter toggle karo |
| `/shuffle` | Queue shuffle |
| `/remove <position>` | Queue se track hatao |
| `/seek <seconds>` | Track ke specific time pe jao |
| `/help` | Saari commands ki list |

---

## 🛠️ Troubleshooting

- **"Cannot find module" error npm install ke baad:** Node.js version check karo (`node -v`),
  v20+ hona chahiye.
- **Bot voice channel join nahi ho raha / audio nahi aa raha:** `sodium-native` aur `mediaplex`
  properly install hue ya nahi check karo (`npm install` dobara chalao).
- **YouTube se error/videos play nahi ho rahe:** YouTube kabhi-kabhi anti-bot checks tighten
  karta hai. `discord-player-youtubei` GitHub page pe "Signing into YouTube" section follow
  karke ek YouTube account se sign-in kar sakte ho for extra reliability — optional but helpful
  agar bot bade servers pe use ho raha ho.
- **Koi command register nahi hua:** `npm run deploy` dobara chalao, aur agar `GUILD_ID` diya
  hai toh check karo bot us exact server mein invited hai.
- Library APIs (khaaskar YouTube extraction) bahut jaldi update hoti hain. Agar koi specific
  error aaye, error message copy karke bata dena — us hisaab se fix kar denge.

---

## 💻 Budget-Friendly Hosting Options

- **Apna PC/laptop:** Free hai, bas `npm start` chalu rakhna hoga (PC on rehna chahiye)
- **Railway / Render:** Free tier available hai, worker/background service ke roop mein deploy karo
- **Cheap VPS** (jaise Hostinger, Contabo): ~₹150–300/month se milta hai, 24/7 uptime milta hai,
  `pm2` process manager se bot ko background mein chala sakte ho

---

Made with 💜 for **AnnySing**
