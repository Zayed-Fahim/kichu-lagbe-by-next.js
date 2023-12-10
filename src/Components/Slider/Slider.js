"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../app/globals.css";
import img_4 from "../../assets/106963490-1634759952978-gettyimages-1308615771-dsc05921.jpeg";
import img_1 from "../../assets/alt-593ecb243e2ba-3814-345dbcf80631a29c1fec1d17f919669a@1x.jpg";
import img_2 from "../../assets/graceway-gourmet-dairy_2048x1365.jpg";
import img_3 from "../../assets/header_photo.2e16d0ba.fill-1200x800.jpg";
import img_6 from "../../assets/iStock-1412353022.2e16d0ba.fill-1440x605.jpg";
import img_5 from "../../assets/photo-1542838132-92c53300491e.avif";
import img_7 from "../../assets/shutterstock_434114893-cd0c4cb444d54eef8ba66c4daf2f7a10.jpg";
import img_8 from "../../assets/unrecognizable-woman-shops-for-produce-in-royalty-free-image-871227828-1533830561.jpg";
import { useEffect, useState } from "react";
import "../../app/globals.css";

const Slider = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="w-full h-[750px] flex justify-center items-center">
          <div className="sliderLoaderHome"></div>
        </div>
      ) : (
        <div className="w-full grid place-items-center">
          <Swiper
            loop
            navigation
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
            pagination={true}
            modules={[EffectCoverflow, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image width={1300} height={750} alt="" src={img_1} />
            </SwiperSlide>
            <SwiperSlide>
              <Image width={1300} height={750} alt="" src={img_2} />
            </SwiperSlide>
            <SwiperSlide>
              <Image width={1300} height={750} alt="" src={img_3} />
            </SwiperSlide>
            <SwiperSlide>
              <Image width={1300} height={750} alt="" src={img_4} />
            </SwiperSlide>
            <SwiperSlide>
              <Image width={1300} height={750} alt="" src={img_5} />
            </SwiperSlide>
            <SwiperSlide>
              <Image width={1300} height={750} alt="" src={img_6} />
            </SwiperSlide>
            <SwiperSlide>
              <Image width={1300} height={750} alt="" src={img_7} />
            </SwiperSlide>
            <SwiperSlide>
              <Image width={1300} height={750} alt="" src={img_8} />
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Slider;
