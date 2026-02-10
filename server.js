const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
const userMessage = req.body.message;

// رد تجريبي (بدون AI حالياً)
res.json({
reply: "مرحبا! السيرفر شغال على الإنترنت ✅\nرسالتك كانت: " + userMessage
});
});

app.get('/', (req, res) => {
res.send('Zak AI server is running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log('Server running on port', PORT);
});