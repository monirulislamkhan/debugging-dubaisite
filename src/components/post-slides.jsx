// "use client"
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import PostItem from './post-item';
import TopPostItems from './top-post-items';
export default function PostSlides({ postItemSlide }) {
  return <>
    {/*  <Swiper
      slidesPerView={1}
      spaceBetween={24}
      modules={[Navigation]}
      navigation={{ clickable: true }}
      className=' overflow-visible!'
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        992: {
          spaceBetween: 32,
          slidesPerView: 3
        }
      }}
    > */}
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-1.5 relative">
      {postItemSlide.map(item => <figure key={item.id} className='post-item relative lg:lg:nth-1:col-span-2 lg:nth-1:row-span-2 lg:nth-4:row-start-1 lg:nth-4:row-span-2 lg:nth-4:col-start-4 lg:nth-4:-col-end-1'>
        <TopPostItems postItem={item} />
      </figure>)}
    </div>
    {/* </Swiper> */}
  </>
}