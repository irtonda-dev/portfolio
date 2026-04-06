// ============================================================
// server.js
// Entry point for the MyWebsite Express server
// Run with: node src/server.js
// ============================================================

// Import Express framework for handling HTTP requests
const express = require('express');

// Import Node.js built-in path module for resolving file paths
const path = require('path');

// Import http module for proxying requests to the API
const http = require('http');

// Initialise the Express application
const app = express();

// --- Network Config ---
// HOST: 0.0.0.0 binds to all network interfaces (required for Docker / external access)
// Falls back to 0.0.0.0 if not set in .env
const HOST = process.env.HOST || '0.0.0.0';

// PORT: the port the server listens on
// Falls back to 3000 if not set in .env
const PORT = process.env.PORT || 3000;

// API_URL: internal Docker service URL — uses Docker DNS name so IP never matters
// Falls back to localhost for local development outside Docker
const API_URL = process.env.API_URL || 'http://localhost:8338';

// --- API Proxy ---
// Any request to /api/* is forwarded to the FastAPI container internally.
// The browser only ever calls /api/... — it never knows the API's IP or port.
app.use('/api', (req, res) => {
    const target = new URL(req.url === '/' ? '' : req.url, API_URL);
    const options = {
        hostname: target.hostname,
        port:     target.port,
        path:     target.pathname + (req.url.includes('?') ? '?' + req.url.split('?')[1] : ''),
        method:   req.method,
        headers:  { ...req.headers, host: target.hostname }
    };

    const proxy = http.request(options, (apiRes) => {
        res.writeHead(apiRes.statusCode, apiRes.headers);
        apiRes.pipe(res, { end: true });
    });

    proxy.on('error', () => {
        res.status(502).json({ error: 'API unavailable' });
    });

    req.pipe(proxy, { end: true });
});

// --- Static File Serving ---
// Tell Express to serve everything inside the /public folder as static files
// This includes index.html, CSS, JS, images, animations, and icons
// __dirname is the current directory (src/), so we go one level up to reach /public
app.use(express.static(path.join(__dirname, '../public')));

// --- Start Server ---
// Begin listening for incoming requests on the specified HOST and PORT
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API proxying to: ${API_URL}`);
});