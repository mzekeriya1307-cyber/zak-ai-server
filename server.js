const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Zak AI server is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", (req, res) => {
  const { message } = req.body;

  res.json({
    reply: "وصلت رسالتك: " + message,
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});