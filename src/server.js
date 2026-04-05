// ============================================================
// server.js
// Entry point for the MyWebsite Express server
// Run with: node src/server.js
// ============================================================

// Import Express framework for handling HTTP requests
const express = require('express');

// Import Node.js built-in path module for resolving file paths
const path = require('path');

// Initialise the Express application
const app = express();

// --- Network Config ---
// HOST: 0.0.0.0 binds to all network interfaces (required for Docker / external access)
// Falls back to 0.0.0.0 if not set in .env
const HOST = process.env.HOST || '0.0.0.0';

// PORT: the port the server listens on
// Falls back to 3000 if not set in .env
const PORT = process.env.PORT || 3000;

// --- Static File Serving ---
// Tell Express to serve everything inside the /public folder as static files
// This includes index.html, CSS, JS, images, animations, and icons
// __dirname is the current directory (src/), so we go one level up to reach /public
app.use(express.static(path.join(__dirname, '../public')));

// --- Start Server ---
// Begin listening for incoming requests on the specified HOST and PORT
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});