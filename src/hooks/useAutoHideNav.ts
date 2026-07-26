import { useEffect, useState } from "react";

const DELTA_THRESHOLD = 8;
const TOP_ZONE = 16;
const BOTTOM_ZONE = 96;

/**
 * Masque la navigation uniquement pendant un défilement descendant volontaire.
 * Elle reste visible près des extrémités, au retour vers le haut et dès qu'un
 * contrôle de navigation reçoit le focus.
 */
export function useAutoHideNav(enabled = true) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setHidden(false);
      return;
    }

    let lastY = Math.max(0, window.scrollY);
    let frame = 0;

    const evaluate = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const delta = y - lastY;

      if (y <= TOP_ZONE || maxY - y <= BOTTOM_ZONE) {
        setHidden(false);
      } else if (Math.abs(delta) >= DELTA_THRESHOLD) {
        setHidden(delta > 0);
      }

      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return { hidden, reveal: () => setHidden(false) };
}
