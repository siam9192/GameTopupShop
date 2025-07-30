'use client';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function HomeBanner() {
  const [currentSlider, setCurrentSlider] = useState(0);

  const carouselImages = [
    'https://i.ytimg.com/vi/WzwHXvjHTag/maxresdefault.jpg',
    'https://cdn-www.bluestacks.com/bs-images/Top-Free-Fire-Characters-of-2025-A-Comprehensive-Guide.png',
    'https://staticg.sportskeeda.com/editor/2021/12/606e9-16392154686721-1920.jpg?w=640',
  ];

  const prevSlider = () =>
    setCurrentSlider(currentSlider =>
      currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1,
    );

  const nextSlider = useCallback(() => {
    setCurrentSlider(currentSlider =>
      currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1,
    );
  }, [carouselImages.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider, currentSlider]);

  return (
    <div className="relative h-72 w-[70%] mx-auto min-w-80 overflow-hidden md:h-[470px] lg:h-[540px]">
      {/* dots */}
      <div className="absolute bottom-4 z-50 flex w-full items-center justify-center gap-1 rounded-full">
        {carouselImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentSlider(idx);
            }}
            className={`rounded-full bg-white duration-500 ${currentSlider === idx ? 'w-8' : 'w-2'} h-2`}
          ></button>
        ))}
      </div>
      {/* Carousel container */}
      <div
        className="relative flex transform-gpu duration-500 ease-linear"
        style={{
          transform: `translateX(-${currentSlider * 100}%)`,
        }}
      >
        {/* slides */}
        {carouselImages.map((img, idx) => (
          <Image
            key={`${img}_${idx}`}
            width={1200}
            height={540}
            src={img}
            className="h-full min-w-full bg-black/20 object-cover sm:h-96 md:h-[540px] rounded-lg"
            alt={`Slider - ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
