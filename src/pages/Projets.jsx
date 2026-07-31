import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';

const PROJETS = [
  { id: 1, titre: 'Devoir 1', categorie: 'HTML/CSS', description: 'Site statique semantique.' },
  { id: 2, titre: 'Devoir 2', categorie: 'JavaScript', description: 'Application interactive.' },
  { id: 3, titre: 'Portfolio', categorie: 'React', description: 'Ce projet de session.' },
];

export default function Projets() {
  const [filtre, setFiltre] = useState('Tous');
  const categories = ['Tous', ...new Set(PROJETS.map((p) => p.categorie))];
  const projetsFiltres = filtre === 'Tous' ? PROJETS : PROJETS.filter((p) => p.categorie === filtre);

  return (
    <section>
      <h1>Nos Projets</h1>
      <div role="group" aria-label="Filtrer les projets">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFiltre(cat)} aria-pressed={filtre === cat}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grille-cartes">
        {projetsFiltres.map((p) => (
          <Link key={p.id} to={`/projets/${p.id}`}>
            <Card titre={p.titre} description={p.description} />
          </Link>
        ))}
      </div>
    </section>
  );
}