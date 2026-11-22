import { useApi } from '../hooks/useApi';
import { getProfil } from '../api/client';
import { SectionTitle } from './Competences';
import { Mail, Phone, MapPin, Briefcase, Code } from 'lucide-react';

<Briefcase className="text-blue-400" size={24} />

export default function Contact() {
  const { data: profil } = useApi(getProfil);
  if (!profil) return null;

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>Contact</SectionTitle>
        <div className="grid md:grid-cols-2 gap-6">
          {profil.email && (
            <a href={`mailto:${profil.email}`}
               className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition flex items-center gap-4">
              <Mail className="text-blue-400" size={24} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-white">{profil.email}</p>
              </div>
            </a>
          )}
          {profil.telephone && (
            <a href={`tel:${profil.telephone}`}
               className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition flex items-center gap-4">
              <Phone className="text-blue-400" size={24} />
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="text-white">{profil.telephone}</p>
              </div>
            </a>
          )}
          {profil.localisation && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <MapPin className="text-blue-400" size={24} />
              <div>
                <p className="text-sm text-gray-500">Localisation</p>
                <p className="text-white">{profil.localisation}</p>
              </div>
            </div>
          )}
          {profil.linkedin && (
            <a href={profil.linkedin} target="_blank" rel="noreferrer"
               className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition flex items-center gap-4">
              <Linkedin className="text-blue-400" size={24} />
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <p className="text-white">Voir mon profil</p>
              </div>
            </a>
          )}
          {profil.github && (
            <a href={profil.github} target="_blank" rel="noreferrer"
               className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition flex items-center gap-4">
              <Github className="text-blue-400" size={24} />
              <div>
                <p className="text-sm text-gray-500">GitHub</p>
                <p className="text-white">Voir mes repos</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}