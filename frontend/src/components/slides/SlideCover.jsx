import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { getProfil } from '../../api/client';

export default function SlideCover({ onNext }) {
  const { data: profil } = useApi(getProfil);
  if (!profil || !profil.nom) return null;

  return (
    <div className="text-center">
      <motion.p
        className="text-blue-400 font-mono mb-4 text-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Bienvenue sur mon portfolio
      </motion.p>

      <motion.h1
        className="text-6xl md:text-8xl font-bold text-white mb-4 leading-tight"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
      >
        {profil.nom}
      </motion.h1>

      <motion.div
        className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"
        initial={{ width: 0 }}
        animate={{ width: 128 }}
        transition={{ delay: 1, duration: 0.6 }}
      />

      <motion.h2
        className="text-2xl md:text-3xl text-gray-300 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {profil.titre}
      </motion.h2>

      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        {profil.cv_pdf_url && (
          <a href={profil.cv_pdf_url} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium text-white transition">
            <Download size={18} /> Télécharger CV
          </a>
        )}
        <button onClick={onNext}
          className="flex items-center gap-2 border border-white/20 hover:border-blue-400 hover:text-blue-400 px-6 py-3 rounded-lg font-medium transition">
          Découvrir <ChevronDown size={18} />
        </button>
      </motion.div>

      <motion.p
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-500 text-xs mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        Utilisez ← → ou cliquez sur les flèches pour naviguer
      </motion.p>
    </div>
  );
}