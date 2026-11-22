import { StaggerGroup, FadeUp } from '../Slide';
import { Mail, Phone, MapPin, Briefcase, Code } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { getProfil } from '../../api/client';

export default function SlideContact() {
  const { data: profil } = useApi(getProfil);
  if (!profil) return null;

  return (
    <StaggerGroup>
      <FadeUp>
        <p className="text-blue-400 font-mono mb-2 text-sm uppercase tracking-widest">
          06 — Contact
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Travaillons ensemble
        </h2>
        <p className="text-gray-400 mb-10">
          N'hésitez pas à me contacter pour toute collaboration ou opportunité.
        </p>
      </FadeUp>

      <div className="grid md:grid-cols-2 gap-4">
        {profil.email && (
          <FadeUp>
            <a href={`mailto:${profil.email}`}
               className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition">
              <Mail className="text-blue-400 mb-2" size={24} />
              <p className="text-xs text-gray-500 uppercase tracking-widest">Email</p>
              <p className="text-white text-sm mt-1">{profil.email}</p>
            </a>
          </FadeUp>
        )}
        {profil.telephone && (
          <FadeUp>
            <a href={`tel:${profil.telephone}`}
               className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition">
              <Phone className="text-blue-400 mb-2" size={24} />
              <p className="text-xs text-gray-500 uppercase tracking-widest">Téléphone</p>
              <p className="text-white text-sm mt-1">{profil.telephone}</p>
            </a>
          </FadeUp>
        )}
        {profil.localisation && (
          <FadeUp>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <MapPin className="text-blue-400 mb-2" size={24} />
              <p className="text-xs text-gray-500 uppercase tracking-widest">Localisation</p>
              <p className="text-white text-sm mt-1">{profil.localisation}</p>
            </div>
          </FadeUp>
        )}
        {profil.linkedin && (
          <FadeUp>
            <a href={profil.linkedin} target="_blank" rel="noreferrer"
               className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition">
              <Briefcase className="text-blue-400 mb-2" size={24} />
              <p className="text-xs text-gray-500 uppercase tracking-widest">LinkedIn</p>
              <p className="text-white text-sm mt-1">Voir mon profil</p>
            </a>
          </FadeUp>
        )}
        {profil.github && (
          <FadeUp>
            <a href={profil.github} target="_blank" rel="noreferrer"
               className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition">
              <Code className="text-blue-400 mb-2" size={24} />
              <p className="text-xs text-gray-500 uppercase tracking-widest">GitHub</p>
              <p className="text-white text-sm mt-1">Voir mes repos</p>
            </a>
          </FadeUp>
        )}
      </div>
    </StaggerGroup>
  );
}