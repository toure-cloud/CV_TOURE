import { StaggerGroup, FadeUp } from '../Slide';
import { ExternalLink, Phone, User } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { getProjets } from '../../api/client';

// Composant SVG pour l'icône GitHub
const GithubSvg = ({ size = 14, className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function SlideProjets() {
  const { data, loading } = useApi(getProjets);

  return (
    <StaggerGroup>
      {/* En-tête de la slide */}
      <FadeUp>
        <p className="text-blue-400 font-mono mb-2 text-sm uppercase tracking-widest">
          05 — Réalisations
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
          Projets
        </h2>
      </FadeUp>

      {/* Grille des projets */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[60vh] overflow-y-auto pr-2 pb-4">
        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : (
          data?.map((p) => (
            <FadeUp key={p.id}>
              <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden h-full flex flex-col hover:border-blue-500/40 transition-colors group">
                
                {/* Image du projet (si existante) */}
                {p.image_url && (
                  <div className="h-32 w-full overflow-hidden">
                    <img 
                      src={p.image_url} 
                      alt={p.titre} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col">
                  {/* Titre et Statut */}
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="text-base font-semibold text-white leading-tight">{p.titre}</h3>
                    {p.statut === 'en_cours' && (
                      <span className="text-[10px] uppercase tracking-wider bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-md whitespace-nowrap">
                        En cours
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-xs flex-1 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Technologies (Tags) */}
                  {p.technologies_list?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.technologies_list.map((t, i) => (
                        <span key={i} className="text-[10px] font-medium bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Références */}
                  {(p.reference_nom || p.reference_tel) && (
                    <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-gray-500 space-y-1">
                      {p.reference_nom && (
                        <p className="flex items-center gap-1.5">
                          <User size={10} className="text-gray-400" /> {p.reference_nom}
                        </p>
                      )}
                      {p.reference_tel && (
                        <p className="flex items-center gap-1.5">
                          <Phone size={10} className="text-gray-400" /> {p.reference_tel}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Liens (Site web + GitHub) */}
                  {(p.lien || p.lien_github) && (
                    <div className="mt-4 flex items-center gap-4">
                      {p.lien && (
                        <a 
                          href={p.lien} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                        >
                          Voir le site <ExternalLink size={12} />
                        </a>
                      )}
                      
                      {p.lien_github && (
                        <a 
                          href={p.lien_github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-gray-300 hover:text-white text-xs font-medium transition-colors"
                        >
                          <GithubSvg size={13} /> Code source
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>
          ))
        )}
      </div>
    </StaggerGroup>
  );
}