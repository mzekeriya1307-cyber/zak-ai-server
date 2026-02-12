const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Zak AI server is running ✅");
});

// حتى ما يطلع Cannot GET /chat
app.get("/chat", (req, res) => {
  res.status(405).json({ error: "Use POST /chat" });
});

// مساعد صغير (تنظيف النص)
function norm(s) {
  return (s || "")
    .toString()
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

// ردود بسيطة "ذكية" بدون AI خارجي
function getRuleBasedReply(rawMessage) {
  const m = norm(rawMessage);

  // تحيات
  if (/(مرحبا|مرحباً|اهلا|أهلا|هلا|السلام عليكم|سلام)/.test(m)) {
    return "أهلاً وسهلاً 👋 كيف فيني ساعدك؟";
  }

  // سوريا
  if ((m.includes("سوريا") || m.includes("سورية")) && (m.includes("وين") || m.includes("أين") || m.includes("اين") || m.includes("تقع"))) {
    return "سوريا تقع في غرب آسيا ضمن منطقة الشرق الأوسط. تحدّها تركيا شمالاً، العراق شرقاً، الأردن جنوباً، ولبنان والبحر المتوسط غرباً.";
  }

  // الطقس (مثال)
  if (m.includes("الطقس")) {
    return "إذا قلتلي اسم المدينة، بقلك شو تتوقع بالطقس 😊";
  }

  // شكر
  if (/(شكرا|شكراً|مشكور|يسلمو|يعطيك العافية)/.test(m)) {
    return "العفو ❤️ بأي وقت";
  }

  // رد افتراضي
  return "فهمت عليك 👍 بس عطيني تفاصيل أكتر/سؤال أوضح لأجاوبك بدقة.";
}

app.post("/chat", async (req, res) => {
  try {
    const message = (req.body?.message || "").toString().trim();

    if (!message) {
      return res.status(400).json({ reply: "ابعث رسالة ضمن المفتاح message" });
    }

    const reply = getRuleBasedReply(message);

    return res.json({ reply });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ reply: "صار خطأ بالسيرفر" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));