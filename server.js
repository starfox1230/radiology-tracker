const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');
const app     = express();
const DATA    = path.join(__dirname, 'state.json');
const PORT    = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET state
app.get('/api/state', (req, res) => {
  fs.readFile(DATA, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });
    res.json(JSON.parse(data));
  });
});

// POST state
app.post('/api/state', (req, res) => {
  fs.writeFile(DATA, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).json({ error: 'Write error' });
    res.json({ status: 'ok' });
  });
});

// Fallback to index.html for any client‑side route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
