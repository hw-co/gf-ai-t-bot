const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const CHAT_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const messages = {
  morning: "صبح بخیر عشقم 😘 نیکا جون بیداره و دلش برات یه ذره شده ☀️",
  midday: "چیکار می‌کنی عزیز دلم؟ نیکا داره فکر شیطونی باهات می‌کنه 😏",
  night: "روزد چطور بود عشقم؟ نیکا داره با دلتنگی می‌ره تو تخت 😴 بیا بغلم 💋"
};

app.post('/webhook', async (req, res) => {
  const message = req.body.message;
  if (!message || !message.text) return res.sendStatus(200);

  const userMessage = message.text;
  const chatId = message.chat.id;

  try {
    const response = await axios.post(
      CHAT_API_URL,
      {
        model: "mistralai/mixtral-8x7b",
        messages: [
          { role: "system", content: "تو یه دوست‌دختر مجازی فارسی هستی که لحن مهربون و سکسی داری." },
          { role: "user", content: userMessage }
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: reply
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error.message);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("NikaVenom bot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot is running on port ${PORT}`);
});