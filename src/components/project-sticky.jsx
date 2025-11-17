'use client';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBedFront, faRulerCombined } from '@fortawesome/pro-light-svg-icons';
import { faMagnifyingGlass, faPhone } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import CommonSearch from './common-search';
import WhatsappLink from './whatsapp-link';

export default function ProjectSticky({ prop }) {
  const [isSticky, setIsSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handle = () => {
      const section = document.getElementById('banner-config-section');
      if (!section) return;
      const { bottom } = section.getBoundingClientRect();
      // Show only when entire banner section has scrolled past the top
      setIsSticky(bottom <= 0);
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, []);
  return (
    <section
      className={`bg-white sticky top-0 shadow-sm z-20 transition-all duration-300 ease-out ${
        isSticky ? 'opacity-100 translate-y-0' : 'h-0 opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="wrapper flex justify-between">
        {/* Sticky items */}
        <div className="self-center py-1.5">
          {/* Project Name */}
          <div className={`mb-1 md:text-[1.4rem] line-clamp-1 ${prop.propname.length >= 25 ? 'text-xl' : 'text-2xl'}`}>
            {prop.propname}
          </div>
          {/* Property Details */}
          <div className="flex gap-3 text-sm">
            {prop.propbed && (
              <div>
                <FontAwesomeIcon icon={faBedFront} className="text-[11px]" /> {prop.propbed} <span>BR</span>
              </div>
            )}
            {prop.propsize !== 'NA' && (
              <div>
                <FontAwesomeIcon icon={faRulerCombined} className="text-[11px]" /> {prop.propsize} <span>Sq. Ft.</span>
              </div>
            )}
          </div>
        </div>
        <div className="self-center hidden lg:block">
          <div className="text-sm min-w-16 max-md:text-right">
            Price <small>(AED)</small>{' '}
            <span
              className={`text-primary block font-bold ${prop.proprice.toLowerCase() == 'on request' ? 'max-sm:text-xs' : 'text-xl'}`}
            >
              {prop.proprice} {prop.proprice.toLowerCase() !== 'on request' && 'M*'}
            </span>
          </div>
        </div>
        {/* Phone & Whatsapp */}
        <div className="hidden self-center lg:flex gap-x-4">
          {prop.propcallnumber && (
            <a href={`tel:+${prop.propcallnumber.split(' ').join('')}`} className="text-phone">
              <FontAwesomeIcon icon={faPhone} /> <span className="text-lg lg:text-xl">{`+${prop.propcallnumber}`}</span>
            </a>
          )}
          {prop.propwhatsapp && (
            <WhatsappLink className="text-whatsapp" phoneNumber={prop.propwhatsapp} message={prop.propname}>
              <FontAwesomeIcon icon={faWhatsapp} /> <span className="text-lg lg:text-xl">Whatsapp</span>{' '}
            </WhatsappLink>
          )}
        </div>

        {/* Sticky Search */}
        <div className="hidden lg:block relative bg-gray-200">
          {showSearch && (
            <div className="pl-2 absolute md:min-w-[500px] right-[60px] bg-gray-200 min-h-full flex items-center">
              <CommonSearch inputClasses="project-search" parentClass="mx-0" />
            </div>
          )}
          <div className="px-2 flex items-center justify-center min-h-full">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center justify-center btn btn-primary px-3"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
