import { ExternalLink, Phone, User } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getProjets } from '../api/client';
import { SectionTitle } from './Competences';

export default function Projets() {
  const { data, loading } = useApi(getProjets);

  return (
    <section id="projets" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Projets réalisés</SectionTitle>
        {loading ? <p className="text-gray-500">Chargement...</p> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map(p => (
              <div key={p.id}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/50 transition flex flex-col">
                {p.image_url && (
                  <img src={p.image_url} alt={p.titre}
                    className="h-40 w-full object-cover" />
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{p.titre}</h3>
                    {p.statut === 'en_cours' && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full whitespace-nowrap">
                        En cours
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm flex-1">{p.description}</p>

                  {p.technologies_list?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {p.technologies_list.map((t, i) => (
                        <span key={i}
                          className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {(p.reference_nom || p.reference_tel) && (
                    <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500 space-y-1">
                      {p.reference_nom && (
                        <p className="flex items-center gap-1">
                          <User size={12} /> Réf. {p.reference_nom}
                        </p>
                      )}
                      {p.reference_tel && (
                        <p className="flex items-center gap-1">
                          <Phone size={12} /> {p.reference_tel}
                        </p>
                      )}
                    </div>
                  )}

                  {p.lien && (
                    <a href={p.lien} target="_blank" rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm">
                      Voir le projet <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}