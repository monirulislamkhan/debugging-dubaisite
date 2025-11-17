'use client';
import { faChevronLeft, faImage } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image, { getImageProps } from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import Fancybox from './fancyBox';

const DUMMY_IMAGE = '/images/project-dummy.avif';

export default function ProjectTopBanners({ firstBanner, mobileBanner, fourBanner, mainBannerAlt, restGalleryItem }) {
  const rawFour = Array.isArray(fourBanner) ? fourBanner.slice(0, 4) : [];
  const uniqueFour = rawFour.map((it, i) => ({
    id: it?.id ?? `four-${i}`,
    image: it?.image || DUMMY_IMAGE,
    alt: it?.alt || 'Project image',
    isPlaceholder: !it?.image,
  }));
  const displayFour = [...uniqueFour];
  while (displayFour.length < 4) {
    displayFour.push({ id: `placeholder-${displayFour.length}`, image: DUMMY_IMAGE, alt: 'Project image', isPlaceholder: true });
  }
  const uniqueRest = Array.isArray(restGalleryItem) ? restGalleryItem : [];

  const [showThumbs, setShowThumbs] = useState(() => { if (typeof window === 'undefined') return false; return window.matchMedia('(min-width: 768px)').matches; });
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(() => new Set());
  const heroImgRef = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const update = () => setShowThumbs(mql.matches);
    
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const heroAlt = mainBannerAlt?.trim?.() ? mainBannerAlt : 'Project image';
  const desktopSrc = firstBanner || mobileBanner || DUMMY_IMAGE;
  const mobileSrc = mobileBanner || firstBanner || DUMMY_IMAGE;

  const [heroSrc, setHeroSrc] = useState(desktopSrc);
  useEffect(() => { setHeroSrc(desktopSrc); }, [desktopSrc]);
  useEffect(() => { setHeroLoaded(false); }, [heroSrc]);

  const heroImageProps = getImageProps({
    src: heroSrc,
    alt: heroAlt,
    quality: 70,
    fill: true,
    priority: true,
    fetchPriority: 'high',
    sizes: '(min-width: 768px) 50vw, 100vw',
    className: 'object-cover object-center block transition-opacity duration-500',
  }).props;

  const mobileImageProps = getImageProps({
    src: mobileSrc,
    alt: heroAlt,
    quality: 70,
    fill: true,
    sizes: '100vw',
    className: 'object-cover object-center block transition-opacity duration-500',
  }).props;

  const heroImageClass = useMemo(() => `${heroImageProps.className} ${heroLoaded ? 'opacity-100' : 'opacity-0'}`, [heroImageProps.className, heroLoaded]);

  useEffect(() => {
    const node = heroImgRef.current;
    if (node && node.complete && node.naturalWidth > 0) setHeroLoaded(true);
  }, [heroImageProps, heroSrc]);

  const realFourCount = uniqueFour.filter((x) => !x.isPlaceholder).length;
  const galleryCount = showThumbs ? 1 + realFourCount + uniqueRest.length : 1 + uniqueRest.length;

  return (
    <>
      <Fancybox options={{ Carousel: { infinite: false } }} className="md:wrapper grid md:grid-cols-4 gap-2 relative">
        {/* First Banner */}
        <div className="col-span-2 row-span-2 md:overflow-hidden md:rounded-l-lg">
          <div className="relative w-full h-75 md:h-95 lg:h-110">
            <picture className="block h-full w-full">
              {mobileImageProps?.srcSet && (
                <source media="(max-width: 767px)" srcSet={mobileImageProps.srcSet} sizes={mobileImageProps.sizes} />
              )}
              <img
                {...heroImageProps}
                alt={heroAlt}
                ref={heroImgRef}
                className={heroImageClass}
                onLoad={() => setHeroLoaded(true)}
                onError={() => {
                  if (heroSrc !== DUMMY_IMAGE) setHeroSrc(DUMMY_IMAGE); else setHeroLoaded(true);
                }}
              />
            </picture>
            {!heroLoaded && (
              <div className="pointer-events-none absolute inset-0 animate-pulse rounded-md bg-slate-200" aria-hidden="true"></div>
            )}

            <div className="absolute md:bottom-0 md:right-4 flex justify-between md:justify-end mt-4 items-start md:items-end md:mb-4  left-4 right-4">
              <Link className="size-10 bg-white rounded-full flex md:hidden justify-center items-center" href="/" aria-label="Back">
                <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
              </Link>
              <a href={heroSrc} data-fancybox="Galleries" className="bg-white shadow p-1.5 px-3 rounded-lg z-20 font-semibold ">
                <FontAwesomeIcon icon={faImage} /> 1/{galleryCount}
              </a>
            </div>
          </div>
        </div>

        {/* Last 4 Banners (md+ only) */}
        {showThumbs && displayFour.map((banner, idx) => (
          banner.isPlaceholder ? (
            <div key={banner.id} className="md:nth-[3]:rounded-tr-xl md:nth-[5]:rounded-br-xl overflow-hidden group">
              <div className="relative w-full lg:h-54 md:h-46">
                <Image src={banner.image} alt={banner.alt} fill loading="lazy" quality={70} sizes="(min-width: 768px) 25vw, 100vw" className="object-cover object-center opacity-70" />
              </div>
            </div>
          ) : (
            <a key={banner.id || `img-${idx}`} href={banner.image} data-fancybox="Galleries" className="md:nth-[3]:rounded-tr-xl md:nth-[5]:rounded-br-xl overflow-hidden group">
              <div className="relative w-full lg:h-54 md:h-46">
                {!thumbLoaded.has(banner.image) && (
                  <div className="pointer-events-none absolute inset-0 animate-pulse rounded-md bg-slate-200" aria-hidden="true"></div>
                )}
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  loading="lazy"
                  quality={70}
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className={`object-cover object-center transition-transform duration-300 ease-in-out transition-opacity ${thumbLoaded.has(banner.image) ? 'opacity-100 group-hover:invert-10' : 'opacity-0'}`}
                  onLoadingComplete={() => setThumbLoaded((prev) => { if (prev.has(banner.image)) return prev; const next = new Set(prev); next.add(banner.image); return next; })}
                />
              </div>
            </a>
          )
        ))}

        {/* Hidden anchors: only 'rest' to keep mobile light */}
        <div className="hidden" aria-hidden="true">
          {uniqueRest.map((item) => (
            <a key={item.id} href={item.image} data-fancybox="Galleries"></a>
          ))}
        </div>
      </Fancybox>
    </>
  );
}



