import { StaggerGroup, FadeUp } from '../Slide';
import { Briefcase, Calendar } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { getExperiences } from '../../api/client';

const fmt = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) : '';

export default function SlideExperiences() {
  const { data } = useApi(getExperiences);

  return (
    <StaggerGroup>
      <FadeUp>
        <p className="text-blue-400 font-mono mb-2 text-sm uppercase tracking-widest">
          03 — Parcours
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
          Expériences professionnelles
        </h2>
      </FadeUp>

      <div className="relative border-l-2 border-blue-500/30 pl-8 space-y-8 max-h-[60vh] overflow-y-auto pr-4">
        {data?.map((exp) => (
          <FadeUp key={exp.id}>
            <div className="relative">
              <div className="absolute -left-[42px] top-2 w-5 h-5 rounded-full bg-blue-500 border-4 border-[#0a0a0f]" />
              <div className="flex items-center gap-2 text-sm text-blue-400 mb-1">
                <Calendar size={14} />
                {fmt(exp.date_debut)} — {exp.en_cours ? "Aujourd'hui" : fmt(exp.date_fin)}
              </div>
              <h3 className="text-xl font-semibold text-white">{exp.poste}</h3>
              <p className="text-gray-300 flex items-center gap-2 mt-1">
                <Briefcase size={14} /> {exp.entreprise}
                {exp.lieu && <span className="text-gray-500"> · {exp.lieu}</span>}
              </p>
              {exp.missions?.length > 0 && (
                <ul className="mt-2 space-y-1 text-gray-400 text-sm list-disc list-inside">
                  {exp.missions.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </StaggerGroup>
  );
}