const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Serve all static assets from the 'dist' directory (including fonts)
app.use(express.static(distPath));

// Catch-all route for index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Start the server with error handling
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
