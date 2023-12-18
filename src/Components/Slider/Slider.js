"use client";
import { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "../../app/globals.css";
import "swiper/css/bundle";

const Slider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const imagesData = [
    {
      no: 1,
      link: "https://i.ibb.co/SVGCWfg/106963490-1634759952978-gettyimages-1308615771-dsc05921.jpg",
    },
    {
      no: 2,
      link: "https://i.ibb.co/Gn7nJ0s/graceway-gourmet-dairy-2048x1365.jpg",
    },
    {
      no: 3,
      link: "https://i.ibb.co/v1W3jBb/header-photo-2e16d0ba-fill-1200x800.jpg",
    },
    {
      no: 4,
      link: "https://i.ibb.co/0MK8QWz/shutterstock-434114893-cd0c4cb444d54eef8ba66c4daf2f7a10.jpg",
    },
    {
      no: 5,
      link: "https://i.ibb.co/LtZf951/unrecognizable-woman-shops-for-produce-in-royalty-free-image-871227828-1533830561.jpg",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="w-full h-screen flex justify-center px-0 py-[50px]">
      {isLoading ? (
        <div className="w-full h-[750px] flex justify-center items-center">
          <div className="sliderLoaderHome"></div>
        </div>
      ) : (
        <Swiper
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {imagesData.map((image) => (
            <SwiperSlide key={image.no}>
              {image.link && (
                <Image width={1350} height={750} alt="" src={image?.link} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Slider;
