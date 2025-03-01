const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 5000;

// Root route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Example API route (Modify as needed)
app.get('/check', async (req, res) => {
    try {
        const response = await axios.get('https://example.com');
        res.json({ status: response.status, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
