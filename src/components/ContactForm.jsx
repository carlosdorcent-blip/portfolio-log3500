import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' });
  const [statut, setStatut] = useState(null);
  const [erreurs, setErreurs] = useState({});

  const validerFormulaire = () => {
    const nouvellesErreurs = {};
    if (!form.nom.trim()) nouvellesErreurs.nom = 'Le nom est requis.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nouvellesErreurs.email = 'Adresse email invalide.';
    }
    if (!form.message.trim()) nouvellesErreurs.message = 'Le message est requis.';
    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validerFormulaire()) return;
    setStatut('chargement');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Echec');
      setStatut('succes');
      setForm({ nom: '', email: '', message: '' });
    } catch {
      setStatut('erreur');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="nom">Nom</label>
      <input id="nom" name="nom" type="text" value={form.nom} onChange={handleChange} />
      {erreurs.nom && <span role="alert">{erreurs.nom}</span>}

      <label htmlFor="email">Courriel</label>
      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
      {erreurs.email && <span role="alert">{erreurs.email}</span>}

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" value={form.message} onChange={handleChange} />
      {erreurs.message && <span role="alert">{erreurs.message}</span>}

      <button type="submit" disabled={statut === 'chargement'}>
        {statut === 'chargement' ? 'Envoi en cours...' : 'Envoyer'}
      </button>

      {statut === 'succes' && <p role="status">Message envoye avec succes !</p>}
      {statut === 'erreur' && <p role="alert">Une erreur est survenue. Reessayez.</p>}
    </form>
  );
}