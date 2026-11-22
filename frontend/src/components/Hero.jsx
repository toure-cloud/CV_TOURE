import { Download, Mail } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getProfil } from '../api/client';

export default function Hero() {
  const { data: profil, loading } = useApi(getProfil);

  if (loading) return (
    <section id="accueil" className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-blue-400">Chargement...</div>
    </section>
  );

  if (!profil || !profil.nom) return null;

  return (
    <section id="accueil"
      className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
      {/* halo décoratif */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-400 font-mono mb-3">Bonjour, je suis</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {profil.nom}
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
            {profil.titre}
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">{profil.bio}</p>
          <div className="flex flex-wrap gap-4">
            {profil.cv_pdf_url && (
              <a href={profil.cv_pdf_url} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium text-white transition">
                <Download size={18} /> Télécharger CV
              </a>
            )}
            <a href="#contact"
               className="flex items-center gap-2 border border-white/20 hover:border-blue-400 hover:text-blue-400 px-6 py-3 rounded-lg font-medium transition">
              <Mail size={18} /> Me contacter
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30" />
            {profil.photo_url ? (
              <img src={profil.photo_url} alt={profil.nom}
                className="relative w-72 h-72 rounded-full object-cover border-4 border-white/10" />
            ) : (
              <div className="relative w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-8xl font-bold text-white">
                {profil.nom.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}