'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function MediaWrapper({
  children,
  breakpoint = 768,
  condition = 'min',
  showOn = 'desktop',
  fallback = null,
}) {
  const query = useMemo(() => {
    if (typeof breakpoint === 'string') return breakpoint;
    return `(${condition}-width: ${breakpoint}px)`;
  }, [breakpoint, condition]);

  const evaluateMatch = useCallback(
    (matches) => {
      if (showOn === 'mobile') {
        return condition === 'max' ? matches : !matches;
      }
      return condition === 'max' ? !matches : matches;
    },
    [showOn, condition]
  );

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    const update = () => setShouldRender(evaluateMatch(mql.matches));
    update();

    if (mql.addEventListener) {
      mql.addEventListener('change', update);
      return () => mql.removeEventListener('change', update);
    }

    mql.addListener(update);
    return () => mql.removeListener(update);
  }, [query, evaluateMatch]);

  if (!shouldRender) {
    return fallback;
  }

  return children;
}
