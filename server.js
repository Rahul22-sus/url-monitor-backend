const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// List of URLs to monitor
const urls = [
    "https://www.google.com",
    "https://www.github.com",
    "https://www.nonexistentwebsite123.com" // Example of a non-working URL
];

// Function to check URL status
async function checkURLs() {
    const results = await Promise.all(
        urls.map(async (url) => {
            try {
                await axios.get(url);
                return { url, status: "✅ Working" };
            } catch (error) {
                return { url, status: "❌ Not Working" };
            }
        })
    );
    return results;
}

// Route to display URL statuses in a table
app.get("/", async (req, res) => {
    const statuses = await checkURLs();
    let responseHtml = `
        <h1>URL Status Monitor</h1>
        <table border="1" cellpadding="10" cellspacing="0">
            <tr>
                <th>URL</th>
                <th>Status</th>
            </tr>
    `;
    
    statuses.forEach(({ url, status }) => {
        responseHtml += `
            <tr>
                <td>${url}</td>
                <td>${status}</td>
            </tr>
        `;
    });

    responseHtml += "</table>";
    res.send(responseHtml);
});

// Start the server on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
