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
  if (nom.trim().length < 2) {
    return res.status(400).json({ ok: false, error: 'Le nom doit contenir au moins 2 caracteres.' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: "Format d'email invalide." });
  }
  if (message.trim().length < 10) {
    return res.status(400).json({ ok: false, error: 'Le message doit contenir au moins 10 caracteres.' });
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
      if (writeErr) {
        console.error('Erreur ecriture messages.json:', writeErr);
        return res.status(500).json({ ok: false, error: 'Erreur serveur.' });
      }
      console.log(`Nouveau message recu de ${nom} (${email})`);
      return res.status(201).json({ ok: true, message: 'Message recu avec succes !' });
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// Route de sante - utile pour verifier que le serveur repond (Railway healthcheck)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(PORT, () => {
  console.log(`Serveur demarre sur le port ${PORT}`);
});