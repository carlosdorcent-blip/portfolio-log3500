import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout.jsx';
import Accueil from './pages/Accueil.jsx';
import Equipe from './pages/Equipe.jsx';
import Projets from './pages/Projets.jsx';
import ProjetDetail from './pages/ProjetDetail.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/projets/:id" element={<ProjetDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </MainLayout>
  );
}