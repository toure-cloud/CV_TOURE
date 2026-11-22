import { Briefcase, Calendar } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getExperiences } from '../api/client';
import { SectionTitle } from './Competences';

const fmt = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) : '';

export default function Experiences() {
  const { data, loading } = useApi(getExperiences);

  return (
    <section id="experiences" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>Expériences professionnelles</SectionTitle>
        {loading ? <p className="text-gray-500">Chargement...</p> : (
          <div className="relative border-l-2 border-blue-500/30 pl-8 space-y-10">
            {data?.map(exp => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-[42px] top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-[#0a0a0f]" />
                <div className="flex items-center gap-2 text-sm text-blue-400 mb-1">
                  <Calendar size={14} />
                  {fmt(exp.date_debut)} — {exp.en_cours ? "Aujourd'hui" : fmt(exp.date_fin)}
                </div>
                <h3 className="text-xl font-semibold text-white">{exp.poste}</h3>
                <p className="text-gray-300 flex items-center gap-2 mt-1">
                  <Briefcase size={14} /> {exp.entreprise}
                  {exp.lieu && <span className="text-gray-500"> · {exp.lieu}</span>}
                </p>
                {exp.description && (
                  <p className="text-gray-400 mt-3">{exp.description}</p>
                )}
                {exp.missions?.length > 0 && (
                  <ul className="mt-3 space-y-1 text-gray-400 text-sm list-disc list-inside">
                    {exp.missions.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}