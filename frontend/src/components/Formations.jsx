import { GraduationCap } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getFormations } from '../api/client';
import { SectionTitle } from './Competences';

export default function Formations() {
  const { data, loading } = useApi(getFormations);

  return (
    <section id="formations" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Formations</SectionTitle>
        {loading ? <p className="text-gray-500">Chargement...</p> : (
          <div className="grid md:grid-cols-2 gap-6">
            {data?.map(f => (
              <div key={f.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="text-purple-400" size={24} />
                  </div>
                  <div className="flex-1">
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}