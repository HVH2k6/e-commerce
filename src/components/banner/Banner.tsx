"use client";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./banner.scss";
export default function Banner() {
    return (
      <div className="banner">
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 5000 }}
        >
            <SwiperSlide>
                <div className="banner-item">
                    <img
                        src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/f6/91/90/a31b6764924077a3f37cda83c29769d0.jpg.webp"
                        alt=""
                        className="banner-img"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="banner-item">
                    <img
                        src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/f6/91/90/a31b6764924077a3f37cda83c29769d0.jpg.webp"
                        alt=""
                        className="banner-img"
                    />
                </div>
            </SwiperSlide>
        </Swiper>
      </div>
    );
}
