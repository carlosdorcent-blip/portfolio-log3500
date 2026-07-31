import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/contact', (req, res) => {
  const { nom, email, message } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!nom || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Tous les champs sont requis.' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: "Format d'email invalide." });
  }

  const nouveauMessage = { nom, email, message, date: new Date().toISOString() };
  const filePath = path.join(__dirname, 'messages.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let messages = [];
    if (!err && data) {
      try { messages = JSON.parse(data); } catch { messages = []; }
    }
    messages.push(nouveauMessage);
    fs.writeFile(filePath, JSON.stringify(messages, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ ok: false, error: 'Erreur serveur.' });
      return res.status(201).json({ ok: true, message: 'Message recu avec succes !' });
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur demarre sur le port ${PORT}`);
});