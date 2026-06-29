import { Children, type ReactNode } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface ResponsiveCarouselProps {
    children: ReactNode;
    autoplay?: boolean;
    delay?: number;
    desktopColumns?: 2 | 3 | 4;
    mobileSlidesPerView?: number;
    tabletSlidesPerView?: number;
}

export function ResponsiveCarousel({
    children,
    autoplay = false,
    delay = 5000,
    desktopColumns = 3,
    mobileSlidesPerView = 1,
    tabletSlidesPerView = 2,
}: ResponsiveCarouselProps) {
    const items = Children.toArray(children);

    const desktopGrid = {
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
    };

    return (
        <>
            {/* Desktop */}
            <div
                className={`hidden gap-8 lg:grid ${desktopGrid[desktopColumns]}`}
            >
                {items}
            </div>

            {/* Mobile e Tablet */}
            <div className="overflow-hidden py-3 lg:hidden">
                <Swiper
                    className="!overflow-hidden pb-10"
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    loop={items.length > 1}
                    grabCursor
                    centeredSlides={false}
                    spaceBetween={16}
                    slidesPerView={mobileSlidesPerView}
                    breakpoints={{
                        640: {
                            slidesPerView: tabletSlidesPerView,
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
                    {items.map((child, index) => (
                        <SwiperSlide
                            key={index}
                            className="h-auto"
                        >
                            <div className="h-full w-full">
                                {child}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}