const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend requests

const urls = [
    "https://www.google.com",
    "https://www.mahadiscom.in/",
    "https://wss.mahadiscom.in/EDapp/Login.aspx",
    "http://10.10.66.5:8080/billingapp/login"
];

app.get('/check-urls', async (req, res) => {
    const results = await Promise.all(
        urls.map(async (url) => {
            try {
                const response = await axios.get(url, { timeout: 5000 });
                return { url, status: response.status === 200 ? "✅ Working" : "⚠️ Issue", success: true };
            } catch (error) {
                return { url, status: "❌ Not Working", success: false };
            }
        })
    );

    res.json(results);
});

app.listen(3000, () => console.log("Server running on port 3000"));
