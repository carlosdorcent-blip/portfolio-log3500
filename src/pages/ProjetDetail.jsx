import { useParams, Link } from 'react-router-dom';

export default function ProjetDetail() {
  const { id } = useParams();
  return (
    <section>
      <h1>Details du projet #{id}</h1>
      <p>Description complete, technologies utilisees, captures d'ecran, lien vers le depot GitHub, etc.</p>
      <Link to="/projets">Retour aux projets</Link>
    </section>
  );
}