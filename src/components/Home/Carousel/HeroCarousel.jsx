// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CarouselSlide from './CarouselSlide';
import book from '../../../assets/images/bookimage.jpg'
import hoodie from '../../../assets/images/hoodie.png'
import laptop from '../../../assets/images/laptop.png'


const HeroCarousel = () => {
    const slides= [
        {
            title: "Premium Book Collection",
            subtitle: "Discount Available",
            image: book,
        },
        {
            title: "Exclusive Hoodi Collection",
            subtitle: "Get our winter collection",
            image: hoodie,
        },
        {
            title: "Digital Product, Affordable Price",
            subtitle: "All type of digital Product",
            image: laptop,
        },
    ]
  return (
    <>
      <Swiper
        
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
            <SwiperSlide key={index}> <CarouselSlide title={slide.title} subtitle={slide.subtitle} image={slide.image} /> </SwiperSlide>

        ))}
        
        
      </Swiper>
    </>
  );
}
export default HeroCarousel;