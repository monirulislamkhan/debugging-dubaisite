'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(useGSAP);
export default function GsapHeading({ children, className, as: Tag = 'div' }) {
  const ref = useRef();
  useEffect(() => {
    gsap.from(ref.current, { xPercent: 100 });
  });

  return (
    <Tag className={className} ref={ref}>
      {children}
    </Tag>
  );
}
