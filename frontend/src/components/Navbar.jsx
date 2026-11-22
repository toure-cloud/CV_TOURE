import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#competences', label: 'Compétences' },
  { href: '#experiences', label: 'Expériences' },
  { href: '#formations', label: 'Formations' },
  { href: '#projets', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all ${
      scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur border-b border-white/10' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#accueil" className="text-xl font-bold text-white">
          Toure<span className="text-blue-500">.</span>Sanga
        </a>
        <div className="hidden md:flex gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
               className="text-sm text-gray-300 hover:text-blue-400 transition">
              {l.label}
            </a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0a0a0f] px-6 pb-6 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="text-gray-300 hover:text-blue-400">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}