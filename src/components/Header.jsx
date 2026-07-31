import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useLang } from '../context/LangContext.jsx';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  return (
    <header className="site-header">
      <span className="logo">portfolio<span>.equipe</span></span>
      <nav aria-label="Navigation principale">
        <NavLink to="/" end>accueil</NavLink>
        <NavLink to="/equipe">equipe</NavLink>
        <NavLink to="/projets">projets</NavLink>
        <NavLink to="/contact">contact</NavLink>
      </nav>
      <div className="controles">
        <button onClick={toggleTheme} aria-label="Changer le theme">
          {theme === 'clair' ? '◐ sombre' : '◑ clair'}
        </button>
        <button onClick={toggleLang} aria-label="Changer la langue">
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>
    </header>
  );
}