import { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';

const MEMBRES = [
  { nom: 'Etudiant 1', bio: 'Frontend & Accessibilite', github: 'octocat' },
  { nom: 'Etudiant 2', bio: 'Architecture React', github: 'octocat' },
  { nom: 'Etudiant 3', bio: 'Backend & DevOps', github: 'octocat' },
];

export default function Equipe() {
  const [stats, setStats] = useState({});
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    async function chargerStats() {
      try {
        const resultats = await Promise.all(
          MEMBRES.map((m) => fetch(`https://api.github.com/users/${m.github}`).then((r) => r.json()))
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
              <p>{stats[m.github].public_repos} depots publics - {stats[m.github].followers} abonnes</p>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}