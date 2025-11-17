'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProjectItem from './project-item';

export default function SimilarProjects({ similarObj }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        modules={[Navigation]}
        navigation={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="overflow-visible! py-4! px-3!"
      >
        {similarObj.map((pItem) => (
          <SwiperSlide
            key={pItem.propId}
            tag="figure"
            className="border border-primary/20 rounded-lg transform! relative transition hover:shadow-lg"
          >
            <ProjectItem projectObject={pItem} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
