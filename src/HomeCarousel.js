// HomeCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeCarousel = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider {...carouselSettings}>
      <div>
        <img src="carousel1.jpg" alt="Carousel 1" />
      </div>
      <div>
        <img src="carousel2.jpg" alt="Carousel 2" />
      </div>
      {/* Add more slides as needed */}
    </Slider>
  );
};

export default HomeCarousel;
