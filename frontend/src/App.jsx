import { AnimatePresence } from 'framer-motion';
import Slide from './components/Slide';
import SlideCover from './components/slides/SlideCover';
import SlideBio from './components/slides/SlideBio';
import SlideCompetences from './components/slides/SlideCompetences';
import SlideExperiences from './components/slides/SlideExperiences';
import SlideFormations from './components/slides/SlideFormations';
import SlideProjets from './components/slides/SlideProjets';
import SlideContact from './components/slides/SlideContact';
import SlideNavigation from './components/SlideNavigation';
import ProgressBar from './components/ProgressBar';
import { useSlides } from './hooks/useSlides';

const SLIDES = [
  { key: 'cover',        label: 'Accueil',     Component: SlideCover },
  { key: 'bio',          label: 'À propos',    Component: SlideBio },
  { key: 'competences',  label: 'Compétences', Component: SlideCompetences },
  { key: 'experiences',  label: 'Expériences', Component: SlideExperiences },
  { key: 'formations',   label: 'Formations',  Component: SlideFormations },
  { key: 'projets',      label: 'Projets',     Component: SlideProjets },
  { key: 'contact',      label: 'Contact',     Component: SlideContact },
];

export default function App() {
  const { current, direction, goTo, next, prev } = useSlides(SLIDES.length);
  const Current = SLIDES[current].Component;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Halo d'arrière-plan */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <ProgressBar current={current} total={SLIDES.length} />

      <AnimatePresence mode="wait" custom={direction}>
        <Slide key={SLIDES[current].key} direction={direction}>
          <Current onNext={next} />
        </Slide>
      </AnimatePresence>

      <SlideNavigation
        current={current}
        total={SLIDES.length}
        onPrev={prev}
        onNext={next}
        onGoTo={goTo}
        labels={SLIDES.map(s => s.label)}
      />
    </div>
  );
}