
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dancing_Script } from "next/font/google";
import DessertBox from "../dessert-box";

// Load fonts
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });

const GalleryComponent = () => {
  const images = [
    "img/text/1.jpg",
    "img/text/2.jpg",
    "img/text/3.jpg",
    "img/text/4.jpg",
    "img/text/5.jpg",
    "img/text/6.jpg",
    "img/text/7.jpg",
    "img/text/8.jpg",
    "img/text/9.jpg",
    "img/text/10.jpg",
    "img/text/11.jpg"
  ];

  return (
    <div 
      className="relative w-full min-h-screen flex flex-col justify-start items-center bg-cover bg-center bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('/img/gallf.jpg')" }}
    >
      {/* Transparent Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8">
        {/* Tagline Section */}
        <div className="flex justify-center mt-32 mb-10">
          <div data-aos="zoom-out" className="py-4 px-8 bg-white/20 backdrop-blur-xl rounded-xl shadow-xl border border-[#5A3E36] w-full max-w-[360px]">
            <h2 className={`text-4xl md:text-5xl text-[#ede6d9] text-center font-semibold ${dancingScript.className}`}>
              Our Specials
            </h2>
          </div>
        </div>

        <DessertBox/>
        <Carousel className="w-full max-w-4xl mx-auto relative">
  {/* Left Arrow - Placed Inside Carousel */}
  <CarouselPrevious 
  className="absolute left-2 sm:left-6 md:left-[-60px] top-1/2 transform -translate-y-1/2 z-20 
             bg-[#B87534] hover:bg-[#C47F39] text-amber-100 p-3 rounded-full shadow-lg transition-all"
/>

  <CarouselContent className="md:-ml-4 flex justify-center">
    {images.map((src, index) => (
      <CarouselItem 
        key={index} 
        className="w-full flex justify-center md:basis-1/2 lg:basis-1/3"
      >
        <img
          src={src}
          alt={`Special ${index + 1}`}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl shadow-lg"
        />
      </CarouselItem>
    ))}
  </CarouselContent>

  {/* Right Arrow - Placed Inside Carousel */}
  <CarouselNext 
  className="absolute right-2 sm:right-6 md:right-[-60px] top-1/2 transform -translate-y-1/2 z-20 
             bg-[#B87534] hover:bg-[#C47F39] text-amber-100 p-3 rounded-full shadow-lg transition-all"
/></Carousel>
        {/* Dessert Box Section */}
        <div className="w-full flex justify-center mt-12">
          
        </div>
      </div>
    </div>
  );
};

export default GalleryComponent;
