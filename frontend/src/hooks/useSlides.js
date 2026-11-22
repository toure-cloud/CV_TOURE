import { useState, useEffect, useCallback } from 'react';

export function useSlides(total) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index) => {
    if (index < 0 || index >= total) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current, total]);

  const next = useCallback(() => {
    if (current < total - 1) {
      setDirection(1);
      setCurrent(c => c + 1);
    }
  }, [current, total]);

  const prev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(c => c - 1);
    }
  }, [current]);

  // Clavier
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') goTo(0);
      else if (e.key === 'End') goTo(total - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, total]);

  // Swipe mobile
  useEffect(() => {
    let startX = 0, startY = 0;
    const onStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? next() : prev();
      }
    };
    window.addEventListener('touchstart', onStart);
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [next, prev]);

  return { current, direction, goTo, next, prev };
}