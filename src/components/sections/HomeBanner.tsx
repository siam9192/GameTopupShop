'use client';
import { getPublicBannersQuery } from '@/query/services/banner';
import { Banner } from '@/types/banner.type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
const defaultImages = [
  'https://i.ytimg.com/vi/WzwHXvjHTag/maxresdefault.jpg',
  'https://cdn-www.bluestacks.com/bs-images/Top-Free-Fire-Characters-of-2025-A-Comprehensive-Guide.png',
  'https://staticg.sportskeeda.com/editor/2021/12/606e9-16392154686721-1920.jpg?w=640',
];
export default function HomeBanner() {
  const [currentSlider, setCurrentSlider] = useState(0);

  const { data, isLoading } = getPublicBannersQuery([]);

  const banners = data?.data || [];

  const prevSlider = () =>
    setCurrentSlider(currentSlider =>
      currentSlider === 0 ? banners.length - 1 : currentSlider - 1,
    );

  const nextSlider = useCallback(() => {
    setCurrentSlider(currentSlider =>
      currentSlider === banners.length - 1 ? 0 : currentSlider + 1,
    );
  }, [banners.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider, currentSlider]);

  const router = useRouter();
  const handleNavigate = (banner: Banner) => {
    if (!banner?.link) return;

    try {
      const currentOrigin = window.location.origin;
      const targetUrl = new URL(banner.link, currentOrigin); // handles relative or absolute

      if (targetUrl.origin === currentOrigin) {
        router.push(targetUrl.pathname + targetUrl.search + targetUrl.hash);
      } else {
        window.open(targetUrl.href, '_blank');
      }
    } catch (err) {}
  };

  return (
    <div className="relative mt-5  w-[80%] md:w-[70%] mx-auto min-w-80 overflow-hidden sm:h-96 md:h-[540px]">
      {/* dots */}
      <div className="absolute bottom-4 z-50 flex w-full items-center justify-center gap-1 rounded-full">
        {banners.map((banner, idx) => (
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
        className="relative flex transform-gpu duration-500 ease-linear rounded-lg"
        style={{
          transform: `translateX(-${currentSlider * 100}%)`,
        }}
      >
        {/* slides */}
        {banners.map((banner, idx) => (
          <Image
            key={`${banner.image}_${idx}`}
            width={1200}
            height={540}
            src={banner.image}
            className="h-full min-w-full bg-black/20 object-cover sm:h-40 md:h-[540px] rounded-lg hover:cursor-pointer"
            alt={`Slider - ${idx + 1}`}
            onClick={() => handleNavigate(banner)}
          />
        ))}
      </div>
    </div>
  );
}
