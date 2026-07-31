import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}