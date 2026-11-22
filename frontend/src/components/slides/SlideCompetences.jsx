import { motion } from 'framer-motion';
import { Code, Smartphone, Network, Database, BarChart3, Layers } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { getCompetences } from '../../api/client';

const ICONS = { 
  code: Code, 
  smartphone: Smartphone, 
  network: Network, 
  database: Database, 
  chart: BarChart3 
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function SlideCompetences() {
  const { data: categories, loading } = useApi(getCompetences);

  if (loading) return <div className="text-center text-gray-500">Chargement...</div>;
  if (!categories || categories.length === 0) return <div className="text-center text-gray-500">Aucune compétence enregistrée.</div>;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-blue-400 font-mono mb-2 text-sm uppercase tracking-widest">
          02 — Compétences
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Ce que je maîtrise
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[55vh] overflow-y-auto pr-2 pb-4"
      >
        {categories.map((cat) => {
          const Icon = ICONS[cat.icone] || Layers;
          return (
            <motion.div 
              key={cat.id}
              variants={itemVariants}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.07] transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="text-blue-400" size={20} />
                </div>
                <h3 className="text-base font-semibold text-white leading-tight">{cat.nom}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.competences.map((comp) => (
                  <span 
                    key={comp.id}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/5 hover:border-blue-400/30 hover:text-white transition-colors cursor-default"
                  >
                    {comp.nom}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}