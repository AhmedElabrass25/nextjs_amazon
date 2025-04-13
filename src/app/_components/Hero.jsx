"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
const Hero = () => {
  const images = ["/sliderImg_1.jpg", "/sliderImg_2.jpg", "/sliderImg_4.jpg"];
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    adaptiveHeight: true,
  };
  return (
    <section className="w-full">
      <div className="row w-full">
        <Slider
          {...settings}
          className="w-full overflow-x-hidden overflow-y-hidden"
        >
          {images.map((img, index) => {
            return (
              <div
                key={index}
                className="w-full h-[300px] md:h-[500px] relative"
              >
                <Image
                  src={img}
                  alt={`Slide ${index}`}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
