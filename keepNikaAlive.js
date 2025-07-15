const axios = require("axios");

const REPL_URL =
  "https://45ff49d1-a12f-4b13-9dc1-c81d3069f558-00-2ryah6xh6o0ix.janeway.replit.dev"; // لینک Replit تو

function keepAwake() {
  setInterval(
    () => {
      axios
        .get(REPL_URL)
        .then(() => console.log("💖 Ping sent to keep Nika awake!"))
        .catch((err) => console.error("Ping failed:", err.message));
    },
    5 * 60 * 1000,
  ); // هر ۵ دقیقه یک بار پینگ می‌فرسته
}

keepAwake();
