import type { ReactNode } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface ResponsiveCarouselProps {
    children: ReactNode[];
    autoplay?: boolean;
    delay?: number;
    desktopColumns?: number;
}

export function ResponsiveCarousel({
    children,
    autoplay = false,
    delay = 5000,
    desktopColumns = 3,
}: ResponsiveCarouselProps) {
    return (
        <>
            {/* Desktop */}
            <div
                className={`hidden lg:grid gap-8 ${
                    desktopColumns === 4
                        ? "lg:grid-cols-4"
                        : desktopColumns === 2
                        ? "lg:grid-cols-2"
                        : "lg:grid-cols-3"
                }`}
            >
                {children}
            </div>

            {/* Mobile */}
            <div className="overflow-hidden lg:hidden">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop={children.length > 1}
                    grabCursor
                    spaceBetween={20}
                    slidesPerView={1}
                    centeredSlides={false}
                    watchOverflow
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                    autoplay={
                        autoplay
                            ? {
                                delay,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                                }
                            : false
                    }
                >
                    {children.map((child, index) => (
                        <SwiperSlide
                            key={index}
                            className="h-auto"
                        >
                            {child}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}