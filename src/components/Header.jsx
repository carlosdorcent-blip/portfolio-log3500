import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useLang } from '../context/LangContext.jsx';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  return (
    <header className="site-header">
      <nav aria-label="Navigation principale">
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/equipe">Equipe</NavLink>
        <NavLink to="/projets">Projets</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <div className="controles">
        <button onClick={toggleTheme} aria-label="Changer le theme">
          {theme === 'clair' ? 'Mode sombre' : 'Mode clair'}
        </button>
        <button onClick={toggleLang} aria-label="Changer la langue">
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>
    </header>
  );
}