import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlideNavigation({ current, total, onPrev, onNext, onGoTo, labels }) {
  return (
    <>
      {/* Compteur en haut à droite */}
      <div className="fixed top-4 right-6 z-40 font-mono text-sm text-gray-500">
        <span className="text-white text-lg font-bold">{current + 1}</span>
        <span className="mx-1">/</span>
        <span>{total}</span>
      </div>

      {/* Flèches */}
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full
                   bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10
                   flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition"
        aria-label="Précédent"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full
                   bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10
                   flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed transition"
        aria-label="Suivant"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Dots en bas */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? 'w-8 bg-blue-500'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Aller à la slide ${i + 1} ${labels?.[i] || ''}`}
            title={labels?.[i]}
          />
        ))}
      </div>
    </>
  );
}