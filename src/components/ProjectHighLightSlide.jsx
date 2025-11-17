'use client';
import { far, fas } from '@awesome.me/kit-d4fc302733/icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CurveShape from './icons/CurveShape';
library.add(fas, far);
export default function ProjectHighLightSlide({ highlights, className }) {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={16}
      modules={[Navigation]}
      navigation={{ clickable: true }}
      className={`${className} overflow-visible!`}
      breakpoints={{
        640: {
          slidesPerView: 'auto',
          spaceBetween: 24,
        },
      }}
    >
      {highlights.map((highlight) => (
        <SwiperSlide
          key={highlight.id}
          className="relative bg-primary/10 rounded-2xl text-center px-8 py-6 min-h-45 md:w-65! lg:w-80!"
        >
          <div className="flex absolute top-0 left-1/2 -translate-x-1/2">
            <CurveShape className="text-white w-60 h-10" />
          </div>
          <div className="relative z-1 size-16 rounded-full bg-primary/50 flex items-center justify-center mx-auto -mt-14 mb-6">
            <FontAwesomeIcon icon={`fa-regular ${highlight.iconId}`} className="text-3xl text-white" />
          </div>
          <div className="font-semibold">{highlight.heading}</div>
          <div className="line-clamp-3">{highlight.description}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
