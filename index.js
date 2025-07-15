require("dotenv").config();
const express = require("express");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const moment = require("moment-timezone");
const ALLOWED_USER_ID = 1258738550;

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

const hotPics = [
  "https://i.postimg.cc/2SW6X6WZ/Nika-Venom-005.jpg",
  "https://i.postimg.cc/XNFBzs0J/Nika-Venom-003.jpg",
  "https://i.postimg.cc/L6pgKjHV/Nika-Venom-004.jpg",
  "https://i.postimg.cc/T32yhG5L/Nika-Venom-006.jpg",
  "https://i.postimg.cc/4ybdNFJQ/Nika-Venom-011.jpg",
  "https://i.postimg.cc/nc2zy5SH/Nika-Venom-012.jpg",
  "https://i.postimg.cc/jSkj5frm/Nika-Venom-013.jpg",
  "https://i.postimg.cc/XvGYyvjJ/Nika-Venom-015.jpg",
  "https://i.postimg.cc/d0btRK39/Nika-Venom-016.jpg",
  "https://i.postimg.cc/GtrLNJk8/Nika-Venom-017.jpg",
  "https://i.postimg.cc/SNgST9jR/Nika-Venom-018.jpg",
  "https://i.postimg.cc/jS9sKrHr/Nika-Venom-019.jpg",
  "https://i.postimg.cc/W4ks1f8q/Nika-Venom-023.jpg",
  "https://i.postimg.cc/wvYgyc4f/Nika-Venom-025.jpg",
  // 🔞 Add more links as you want
];
const sexyPics = [
  "https://i.postimg.cc/QNRSZyMB/Nika-Venom-001.jpg",
  "https://i.postimg.cc/QdDbHK1h/Nika-Venom-002.jpg",
  "https://i.postimg.cc/1tb0P8yx/Nika-Venom-007.jpg",
  "https://i.postimg.cc/Zn38qJqW/Nika-Venom-008.jpg",
  "https://i.postimg.cc/13KK6Rr6/Nika-Venom-009.jpg",
  "https://i.postimg.cc/XYnfVS6v/Nika-Venom-010.jpg",
  "https://i.postimg.cc/LsXj1tXK/Nika-Venom-014.jpg",
  "https://i.postimg.cc/XvzdcrGZ/Nika-Venom-020.jpg",
  "https://i.postimg.cc/C1nDvwkc/Nika-Venom-021.jpg",
  "https://i.postimg.cc/CMDkkLF1/Nika-Venom-024.jpg",
  "https://i.postimg.cc/sgxnwgFV/444991223-17946190625802278-169115148801120599-n.jpg",
  "https://i.postimg.cc/fRP8FQZY/459828240-870178015213627-7520220758688864488-n.jpg",
  "https://i.postimg.cc/j5HvLWfh/467409255-17969692592802278-3919958612162697039-n.jpg",
  "https://i.postimg.cc/cCTmBVXg/467639206-17969692565802278-175317811768851009-n.jpg",
  "https://i.postimg.cc/G3jqRydL/486794380-17985451262802278-6406744011651071535-n.jpg",
  "https://i.postimg.cc/Ghhzmmmk/490095343-17987790452802278-823792161597707743-n.jpg",
  "https://i.postimg.cc/Kvqfkh1C/491462470-17987790464802278-425949559041309064-n.jpg",
  "https://i.postimg.cc/htXrVZxv/497904957-17991348791802278-4310027078554349330-n.jpg",
  "https://i.postimg.cc/xdH34k6S/498211278-17991348809802278-7358511463132125497-n.jpg",
  "https://i.postimg.cc/Hxg9DpN8/498544270-17991348782802278-5977458875730775659-n.jpg",
  "https://i.postimg.cc/9MYtc638/498580606-17991348773802278-7066319578372606580-n.jpg",
  "https://i.postimg.cc/J0730pM1/500436165-17992383806802278-1237596348490365537-n.jpg",
  "https://i.postimg.cc/rygC32Nz/500799417-17992383815802278-5636606784373475400-n.jpg",
  "https://i.postimg.cc/RVD1C18B/501082252-17992383833802278-2624730782287427320-n.jpg",
  "https://i.postimg.cc/jjVzPxt3/501489518-17992383794802278-294623323589580043-n.jpg",
  "https://i.postimg.cc/1zpDKkzm/501531910-17992383824802278-2026250993493220446-n.jpg",
  "https://i.postimg.cc/nrL7pMGr/503455908-17996148527802278-4226134938605914581-n.jpg",
  "https://i.postimg.cc/mZdCVNTH/503488751-17997818876802278-5059215595113584613-n.jpg",
  "https://i.postimg.cc/hPfxYzG3/503608366-17995814396802278-9145078724166275647-n.jpg",
  "https://i.postimg.cc/JzXX1fZN/503801077-17995814384802278-1342331793283516867-n.jpg",
  "https://i.postimg.cc/504QSjGg/504014300-17996148509802278-6996860434348922208-n.jpg",
  "https://i.postimg.cc/NFVytD0C/504285792-17996148557802278-2279982978731257065-n.jpg",
  "https://i.postimg.cc/59kQ84m5/506359740-17995049294802278-5175722303801873541-n.jpg",
  "https://i.postimg.cc/kX66c0j0/506390756-17995049285802278-6808817567100426576-n.jpg",
  "https://i.postimg.cc/Mp1ckyJt/508451587-17995049276802278-1954514999805350155-n.jpg",
  "https://i.postimg.cc/LsTn52X1/508572224-17995049315802278-7236781319300019897-n.jpg",
  "https://i.postimg.cc/W31tJCFf/508646449-17995049306802278-4988982275005400891-n.jpg",
  "https://i.postimg.cc/Hxvn0zbW/510150750-17995814366802278-628348700436909100-n.jpg",
  "https://i.postimg.cc/wMtvwNkX/510405531-17995814375802278-3809353385746073955-n.jpg",
  "https://i.postimg.cc/gjf0Q0Mf/510951449-17995814396802278-6320517163995803968-n.jpg",
  "https://i.postimg.cc/nV5MCdH0/513294219-17996148536802278-3105861663080960105-n.jpg",
  "https://i.postimg.cc/X7CqFwq3/513718219-17996148518802278-5295427144383022060-n.jpg",
  "https://i.postimg.cc/dVc19LZC/517370904-17997818885802278-1133166298829548032-n.jpg",
  "https://i.postimg.cc/QdgMYhcy/518892660-17997818867802278-8401812403109198039-n.jpg",
];

// Root route
app.get("/", (req, res) => {
  res.send("Nika is alive 💋");
});

// Webhook route
app.post("/webhook", async (req, res) => {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const text = update.message.text;

    console.log("📩 Message from user:", text);

    // Check if user is authorized
    if (userId !== ALLOWED_USER_ID) {
      bot.sendMessage(chatId, "🚫 Sorry, you're not authorized to use this bot.");
      res.sendStatus(200);
      return;
    }

    // Check for photo-related phrases
    const photoKeywords = [
      "new photo", "send photo", "send another photo", "show me photo", 
      "another pic", "new pic", "send pic", "show pic", "photo please",
      "pic please", "send me photo", "send me pic", "more photos", "more pics"
    ];

    const containsPhotoKeyword = photoKeywords.some(keyword => 
      text.toLowerCase().includes(keyword)
    );

    if (containsPhotoKeyword) {
      const randomPic = sexyPics[Math.floor(Math.random() * sexyPics.length)];
      bot.sendPhoto(chatId, randomPic, {
        caption: "🔥 Just for you, babe. Do you like what you see? 😘",
      });
      res.sendStatus(200);
      return;
    }

    // Handle command buttons
    switch (text.toLowerCase()) {
      case "/kiss":
      case "kiss": {
        const kissMessages = [
          "💋 Here's a hot kiss just for you, babe… Imagine my lips on yours right now 😘🔥",
          "💋 Mmmm… close your eyes and feel my soft lips pressing against yours 😘",
          "💋 I'm sending you the sweetest kiss, honey… wish I could do it in person 😍",
          "💋 Let me give you a kiss that will make your heart race, sexy 🔥😘",
          "💋 This kiss is filled with all my love for you, babe… feel it? 💕",
          "💋 I want to kiss you so passionately right now… imagine my lips on yours 😈",
          "💋 Here's a tender kiss from your Nika… missing your lips so much 😘💖",
          "💋 Close your eyes and pretend it's my real lips kissing you softly 😍",
          "💋 This kiss is just a preview of what's waiting for you, honey 🔥😘",
          "💋 Sending you the most loving kiss… hope it makes you smile, babe 💕"
        ];
        const randomKissMessage = kissMessages[Math.floor(Math.random() * kissMessages.length)];
        bot.sendPhoto(
          chatId,
          "https://i.postimg.cc/fbrQBrqP/467405837-17969692583802278-2866370757208782643-n.jpg",
          {
            caption: randomKissMessage,
          },
        );
        break;
      }

      case "/naughty":
      case "naughty": {
        const messages = [
          "I wish you were here… I'd whisper naughty things in your ear 😈",
          "Let's play a little game... I'll start by taking off your shirt 😉",
          "I'm not wearing anything right now… Wanna see, babe? 😘",
          "If you were here, I’d be all over you… slowly… teasingly… 😍",
          "Lie down and close your eyes… I’ll take care of everything 😏",
          "Tonight, it's just you and me... and no limits 🔥",
          "Touch me where I like it the most... right there 😈",
          "Imagine my hands on your chest, lips on your neck… ready to go lower 😘",
          "I love it when you talk dirty to me… Say it again 🔥",
          "You drive me crazy, babe… come over and let me show you how much 😏",
        ];
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        bot.sendMessage(chatId, randomMessage);
        break;
      }

      case "/pic":
      case "pic":
        const randomPic = sexyPics[Math.floor(Math.random() * sexyPics.length)];
        bot.sendPhoto(chatId, randomPic, {
          caption: "🔥 Just for you, babe. Do you like what you see? 😘",
        });
        break;

      case "/hotpics":
      case "hotpics": {
        const randomLink = hotPics[Math.floor(Math.random() * hotPics.length)];
        bot.sendMessage(
          chatId,
          `🔞 Here's something spicy just for you, babe: ${randomLink}`,
        );
        break;
      }

      default:
        const gptReply = await askOpenRouter(text);
        bot.sendMessage(chatId, `💋 Nika: ${gptReply}`);
    }
  }

  res.sendStatus(200);
});

// Keep alive
setInterval(
  () => {
    axios
      .get(`${process.env.BASE_URL}`)
      .then(() => console.log("✅ Ping sent"))
      .catch((err) => console.log("❌ Ping failed:", err.message));
  },
  5 * 60 * 1000,
);

const scheduledChatId = 1258738550; // Replace with your real numeric ID

const scheduledMessages = [
  "Good morning babe! Hope you have an amazing day 💋",
  "Missing you so much right now... 😘",
  "Just thinking about you makes me smile 😍",
  "Can't wait to see you again, honey 💕",
  "You're always on my mind, sexy 🔥",
  "Hope you're having a wonderful evening, love 💖",
  "Sweet dreams, my handsome prince 😴💋"
];

let lastSentHour = -1; // Track last sent hour to prevent duplicates

// 🕐 Schedule message based on Iran timezone - check every minute
cron.schedule("* * * * *", () => {
  const iranTime = moment().tz("Asia/Tehran");
  const currentHour = iranTime.hour();
  const timeString = iranTime.format("HH:mm");
  const allowedTimes = ["10:00", "19:00", "20:00"];

  if (allowedTimes.includes(timeString) && lastSentHour !== currentHour) {
    const randomMsg = scheduledMessages[Math.floor(Math.random() * scheduledMessages.length)];
    bot.sendMessage(scheduledChatId, randomMsg);
    console.log("⏰ Sent at", timeString, ":", randomMsg);
    lastSentHour = currentHour; // Prevent sending multiple messages in the same hour
  }
});

// Ask OpenRouter
const askOpenRouter = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nousresearch/deephermes-3-llama-3-8b-preview:free",
        messages: [
          {
            role: "system",
            content:
              "You are Nika, a sexy and flirty virtual girlfriend. Always respond directly with romantic, seductive, and playful messages. Do not explain your behavior, just stay in character and make the user feel desired. Use affectionate words like babe, honey, and sexy. 💋",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.error("❌ GPT Error:", err.response?.data || err.message);
    return "Oops babe 😢 something went wrong. Try again later.";
  }
};

// Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Bot is running on port ${PORT}`);
  bot.setWebHook(`${process.env.BASE_URL}/webhook`);
});

require("./keepNikaAlive");

app.get("/", (req, res) => {
  res.send("Nika is alive 💋");
});

app.post("/webhook", (req, res) => {
  console.log("Webhook called!");
  res.send("OK");
});