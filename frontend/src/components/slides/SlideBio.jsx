import { StaggerGroup, FadeUp, FadeIn } from '../Slide';
import { useApi } from '../../hooks/useApi';
import { getProfil } from '../../api/client';

export default function SlideBio() {
  const { data: profil } = useApi(getProfil);
  if (!profil) return null;

  return (
    <StaggerGroup>
      <FadeUp>
        <p className="text-blue-400 font-mono mb-2 text-sm uppercase tracking-widest">
          01 — À propos
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
          Qui suis-je ?
        </h2>
      </FadeUp>

      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
        <FadeIn>
          <div className="relative mx-auto md:mx-0 w-56 h-56">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-40" />
            {profil.photo_url ? (
              <img src={profil.photo_url} alt={profil.nom}
                className="relative w-full h-full rounded-full object-cover border-4 border-white/10" />
            ) : (
              <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-7xl font-bold text-white">
                {profil.nom.charAt(0)}
              </div>
            )}
          </div>
        </FadeIn>

        <FadeUp>
          <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
            {profil.bio}
          </p>
        </FadeUp>
      </div>
    </StaggerGroup>
  );
}