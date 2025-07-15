require("dotenv").config();
const express = require("express");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const bodyParser = require("body-parser");
const cron = require("node-cron");

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

const hotPics = [
  "https://i.imgur.com/zBOKGiV.jpeg",
  "https://i.imgur.com/abc1234.jpeg",
  "https://i.imgur.com/xyz5678.jpeg",
  "https://i.imgur.com/qwe7890.jpeg",
  // 🔞 Add more links as you want
];
const sexyPics = [
  "https://i.imgur.com/zBOKGiV.jpeg",
  "https://i.imgur.com/abc1234.jpeg",
  "https://i.imgur.com/def5678.jpeg",
  "https://i.imgur.com/ghi9012.jpeg",
  "https://i.imgur.com/zBOKGiV.jpeg",
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
    const text = update.message.text;

    console.log("📩 Message from user:", text);

    // Handle command buttons
    switch (text.toLowerCase()) {
      case "/kiss":
      case "kiss":
        bot.sendPhoto(chatId, "https://i.imgur.com/zBOKGiV.jpeg", {
          caption:
            "💋 Here’s a hot kiss just for you, babe… Imagine my lips on yours right now 😘🔥",
        });
        break;

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

// Scheduled messaging
const scheduledChatId = "YOUR_CHAT_ID_HERE"; // Replace with your or target chat ID

const scheduledMessages = [
  "Hello babe! Remember you're going to have an amazing day 😘",
  "Time to take a deep breath and smile 😍",
  "Hope your day is full of positive vibes, a little kiss from Robo 💋",
  "Thinking of you makes my days sweeter 🥰",
];

// Cron job schedule format: minute hour day month dayOfWeek
// This example runs every day at 10:00 AM and 8:00 PM
cron.schedule("0 10,20 * * *", () => {
  const randomMsg = scheduledMessages[Math.floor(Math.random() * scheduledMessages.length)];
  bot.sendMessage(scheduledChatId, randomMsg);
  console.log("⏰ Scheduled message sent:", randomMsg);
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
