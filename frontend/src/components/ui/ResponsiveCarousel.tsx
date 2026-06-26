import type { ReactNode } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
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
                className={`hidden lg:grid gap-8 ${desktopColumns === 4
                        ? "lg:grid-cols-4"
                        : desktopColumns === 2
                            ? "lg:grid-cols-2"
                            : "lg:grid-cols-3"
                    }`}
            >
                {children}
            </div>

            {/* Mobile e Tablet */}
            <div className="overflow-visible px-2 py-3 lg:hidden">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    grabCursor={true}
                    watchOverflow={false}
                    spaceBetween={20}
                    slidesPerView={1}
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
                        <SwiperSlide key={index}>
                            {child}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}