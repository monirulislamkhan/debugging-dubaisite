'use client';
import { faChevronLeft, faImage } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Link } from 'react-scroll';
import Fancybox from './fancyBox';
import MediaWrapper from './MediaWrapper';

const DUMMY_IMAGE = '/images/project-dummy.avif';

export default function ProjectTopBanners({ firstBanner, mobileBanner, fourBanner, mainBannerAlt, restGalleryItem }) {
  const heroAlt = mainBannerAlt?.trim?.() ? mainBannerAlt : 'Project image';
  const heroDesktop = firstBanner || mobileBanner || DUMMY_IMAGE;
  const heroMobile = mobileBanner || firstBanner || DUMMY_IMAGE;
  const thumbs = Array.isArray(fourBanner) ? fourBanner.slice(0, 4) : [];
  const rest = Array.isArray(restGalleryItem) ? restGalleryItem : [];
  const totalCount = 1 + thumbs.length + rest.length;

  return (
    <>
      <Fancybox
        options={{ Carousel: { infinite: false } }}
        className="md:wrapper grid grid-cols-1 md:grid-cols-4 md:gap-2 relative"
      >
        {/* Hero */}
        <div className="col-span-2 row-span-2 md:overflow-hidden md:rounded-l-lg">
          <div className="relative w-full h-75 md:h-95 lg:h-110 group">
            <div className="max-md:absolute max-md:flex justify-between max-md:mt-4 max-md:items-start max-md:left-4 max-md:right-4 z-20 max-md:inset-0">
              <Link
                className="size-9 bg-white rounded-full flex md:hidden justify-center items-center"
                href="/"
                aria-label="Back"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
              </Link>
              <a
                href={heroDesktop}
                data-fancybox="Galleries"
                className="md:absolute inset-0 z-20 md:flex md:flex-col md:justify-end md:items-end md:w-full md:h-full"
                tabIndex="-1"
                aria-label="Open gallery image"
              >
                <span className="bg-white shadow py-1.5 px-3 font-semibold rounded-lg md:mr-4 md:mb-4 block">
                  <FontAwesomeIcon icon={faImage} /> 1/{totalCount}
                </span>
              </a>
            </div>
            {/* Mobile hero */}
            <picture>
              <source media="(min-width: 768px)" srcSet={heroDesktop} />
              <img
                src={heroMobile}
                alt={heroAlt}
                loading="eager"
                decoding="async"
                className="object-cover object-center w-full h-full block lg:rounded-l-lg"
              />
            </picture>
          </div>
        </div>

        {/* Thumbnails */}
        {thumbs.map((t, i) => {
          const src = t?.image || DUMMY_IMAGE;
          const alt = t?.alt || 'Project image';
          return (
            <a
              key={t?.id || `thumb-${i}`}
              href={src}
              data-fancybox="Galleries"
              className="md:nth-[3]:rounded-tr-xl md:nth-[5]:rounded-br-xl md:overflow-hidden md:group"
            >
              <MediaWrapper>
                <div className="relative w-full lg:h-54 md:h-46">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    loading="lazy"
                    quality={70}
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </MediaWrapper>
            </a>
          );
        })}

        {/* Hidden anchors for rest of the gallery */}
        <div className="hidden" aria-hidden="true">
          {rest.map((item, idx) => (
            <a key={item?.id || `rest-${idx}`} href={item?.image || DUMMY_IMAGE} data-fancybox="Galleries" />
          ))}
        </div>
      </Fancybox>
    </>
  );
}
