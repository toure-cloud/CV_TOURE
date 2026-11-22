import { StaggerGroup, FadeUp } from '../Slide';
import { GraduationCap } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { getFormations } from '../../api/client';

export default function SlideFormations() {
  const { data } = useApi(getFormations);

  return (
    <StaggerGroup>
      <FadeUp>
        <p className="text-blue-400 font-mono mb-2 text-sm uppercase tracking-widest">
          04 — Formation
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
          Diplômes & Formations
        </h2>
      </FadeUp>

      <div className="grid md:grid-cols-2 gap-5">
        {data?.map((f) => (
          <FadeUp key={f.id}>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{f.diplome}</h3>
                  <p className="text-gray-300 text-sm">{f.etablissement}</p>
                  {f.specialisation && (
                    <p className="text-blue-400 text-sm mt-1">{f.specialisation}</p>
                  )}
                  {f.en_cours && (
                    <span className="inline-block mt-2 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                      En cours
                    </span>
                  )}
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </StaggerGroup>
  );
}