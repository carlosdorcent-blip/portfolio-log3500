import { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';

const MEMBRES = [
  {
    nom: 'Carlos Dorcent',
    bio: 'Backend & DevOps',
    github: 'carlosdorcent-blip',
    devoirs: [
      { titre: 'Devoir 1', lien: 'https://github.com/carlosdorcent-blip/tableau-m-t-o' },
      { titre: 'Devoir 2', lien: 'https://github.com/carlosdorcent-blip/Devoir-INF3500' },
    ],
  },
  {
    nom: 'Saint-Fleury Rosemitha',
    bio: 'Composants React',
    github: 'rose123570',
    devoirs: [
      { titre: 'Devoir 1', lien: 'https://github.com/rose123570/Devoir-programation-de-site' },
      { titre: 'Devoir 2', lien: 'https://github.com/rose123570/rose123570' },
    ],
  },
  {
    nom: 'Appolon Admaquise',
    bio: 'Context API & GitHub',
    github: 'Appolon-Admaquise',
    devoirs: [
      { titre: 'Devoir 1', lien: 'https://github.com/Appolon-Admaquise/Devoir1-INF3500' },
      { titre: 'Devoir 2', lien: 'https://github.com/Appolon-Admaquise/tableau-bord-meteo' },
    ],
  },
];

export default function Equipe() {
  const [stats, setStats] = useState({});
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    async function chargerStats() {
      try {
        const resultats = await Promise.all(
          MEMBRES.map((m) =>
            fetch(`https://api.github.com/users/${m.github}`).then((r) => r.json())
          )
        );
        const map = {};
        MEMBRES.forEach((m, i) => { map[m.github] = resultats[i]; });
        setStats(map);
      } catch {
        setErreur("Impossible de charger les donnees GitHub pour le moment.");
      } finally {
        setChargement(false);
      }
    }
    chargerStats();
  }, []);

  return (
    <section>
      <h1>Notre Equipe</h1>
      {chargement && <p>Chargement des statistiques GitHub...</p>}
      {erreur && <p role="alert">{erreur}</p>}
      <div className="grille-cartes">
        {MEMBRES.map((m) => (
          <Card key={m.github} titre={m.nom} description={m.bio}>
            {stats[m.github] && (
              <p>
                {stats[m.github].public_repos} depots publics -{' '}
                {stats[m.github].followers} abonnes
              </p>
            )}
            <ul>
              {m.devoirs.map((d) => (
                <li key={d.titre}>
                  <a href={d.lien} target="_blank" rel="noopener noreferrer">
                    {d.titre}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}