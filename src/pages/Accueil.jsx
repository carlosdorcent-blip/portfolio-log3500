import { Link } from 'react-router-dom';

export default function Accueil() {
  return (
    <section className="hero">
      <span className="eyebrow">LOG3500 — Ete 2026</span>
      <h1>Portfolio Professionnel de notre equipe</h1>
      <p>
        Trois etudiants, un seul depot Git : nous concevons, developpons et
        deployons une application web full-stack de bout en bout — React
        cote client, Express cote serveur, deploiement continu sur Railway.
      </p>
      <Link to="/projets" className="btn">Voir nos projets →</Link>
    </section>
  );
}