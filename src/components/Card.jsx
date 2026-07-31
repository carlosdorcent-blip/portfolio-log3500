export default function Card({ titre, description, image, children }) {
  return (
    <article className="card">
      {image && <img src={image} alt={titre} />}
      <h3>{titre}</h3>
      <p>{description}</p>
      {children}
    </article>
  );
}