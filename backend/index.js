const express = require('express');
const app = express();

// JSON data based on locale
const dataEn = {
    Home: {
        welcome: "Welcome from Test API 2132132131"
    },
    About: {
        profile: "Profile",
        change_language: "Change Language Test API"
    }
};

const dataTh = {
    Home: {
        welcome: "ยินดีต้อนรับ ทดสอบ API"
    },
    About: {
        profile: "โปรไฟล์ ทดสอบ API",
        change_language: "เปลี่ยนภาษา ทดสอบ API"
    }
};

// Endpoint to handle requests with locale parameter
app.get('/test/:locale', (req, res) => {
    const { locale } = req.params;

    // Check locale and return appropriate JSON
    if (locale === 'en') {
        res.json(dataEn);
    } else if (locale === 'th') {
        res.json(dataTh);
    } else {
        res.status(400).json({ error: 'Invalid locale. Please use "en" or "th".' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
