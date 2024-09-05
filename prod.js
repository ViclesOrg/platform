const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// History API fallback for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Example API endpoint
app.get('/api/example', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

// Set the port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
