'use client';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fancybox from './fancyBox';

import { faChevronDown, faRulerCombined } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function ProjectFloorPlan({ floorPlanList }) {
  const [openId, setOpenId] = useState(null);
  const extractArea = (value) => {
    if (!value) return null;
    const match = String(value)
      .replace(/,/g, '')
      .match(/([0-9]+(?:\.[0-9]+)?)/);
    return match ? parseFloat(match[1]) : null;
  };
  const getAreaRange = (details = []) => {
    const nums = details.map((d) => extractArea(d.totalArea)).filter((n) => Number.isFinite(n));
    if (!nums.length) return null;
    return { min: Math.min(...nums), max: Math.max(...nums) };
  };
  const fmtSqFt = (n) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));
  return (
    <>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <div className="flex flex-col gap-4">
          {floorPlanList.map((floorName) => {
            const isOpen = openId === floorName.catid;
            const sectionId = `floor-${floorName.catid}`;
            const range = getAreaRange(floorName.unitDetails);
            return (
              <div key={floorName.catid} className={`py-2 px-5 rounded-xl border shadow`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  aria-expanded={isOpen}
                  aria-controls={sectionId}
                  onClick={() => setOpenId((prev) => (prev === floorName.catid ? null : floorName.catid))}
                >
                  <div className="flex gap-x-2 items-center">
                    <div className="bg-slate-200 rounded-full p-3 flex justiy-center items-center">
                      <FontAwesomeIcon icon={faRulerCombined} className="text-xl" />
                    </div>
                    <div>
                      <h4 className={`text-lg/tight font-semibold mb-0`}>{floorName.unitName}</h4>
                      {range && (
                        <span className="text-sm/tight text-gray-500">
                          Sizes : {fmtSqFt(range.min)} - {fmtSqFt(range.max)} Sq. Ft.
                        </span>
                      )}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  />
                </button>
                {/* Smooth collapse/expand container */}
                <div
                  id={sectionId}
                  className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    {isOpen && (
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={16}
                        modules={[Navigation]}
                        navigation={{ clickable: true }}
                        observer={true}
                        observeParents={true}
                        autoHeight={true}
                        className="mt-2"
                      >
                        {floorName.unitDetails.map((floor) => (
                          <SwiperSlide key={floor.id} tag="figure">
                            <a
                              data-fancybox="floorPlan"
                              data-caption={floor.floorImageAlt}
                              href={floor.floorImage}
                              className="flex flex-col bg-slate-50"
                            >
                              <Image
                                src={floor.floorImage}
                                alt={floor.floorImageAlt || 'Floor Plan'}
                                width={600}
                                height={500}
                                loading="lazy"
                                decoding="async"
                                quality={70}
                                sizes="(min-width: 1024px) 600px, (min-width: 768px) 70vw, 100vw"
                                className="h-50 md:h-100 mx-auto object-cover object-top"
                              />
                            </a>
                            <div className="py-4">
                              <h5>{floor.floorName}</h5>
                              <div className="flex justify-between gap-4 border-t border-gray-200 pt-1 mt-1">
                                Total Area : <span>{floor.totalArea}</span>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Fancybox>
    </>
  );
}
