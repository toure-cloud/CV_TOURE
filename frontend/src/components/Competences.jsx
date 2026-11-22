import { Code, Smartphone, Network, Database, BarChart3, Layers } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getCompetences } from '../api/client';

const ICONS = { code: Code, smartphone: Smartphone, network: Network,
  database: Database, chart: BarChart3 };

function CompetenceCard({ cat }) {
  const Icon = ICONS[cat.icone] || Layers;
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
        <Icon className="text-blue-400" size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{cat.nom}</h3>
      {cat.description && (
        <p className="text-sm text-gray-400 mb-4">{cat.description}</p>
      )}
      <ul className="space-y-2">
        {cat.competences.map(c => (
          <li key={c.id}>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>{c.nom}</span>
              <span className="text-gray-500">{c.niveau}/5</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                   style={{ width: `${(c.niveau / 5) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Competences() {
  const { data: categories, loading } = useApi(getCompetences);

  return (
    <section id="competences" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Compétences</SectionTitle>
        {loading ? <p className="text-gray-500">Chargement...</p> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map(cat => <CompetenceCard key={cat.id} cat={cat} />)}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionTitle({ children, sub }) {
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-white mb-2">{children}</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      {sub && <p className="text-gray-400 mt-4">{sub}</p>}
    </div>
  );
}