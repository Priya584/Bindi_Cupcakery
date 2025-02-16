

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dancing_Script } from "next/font/google";

// Load fonts
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });

const GalleryComponent = () => {
  const images = [
    "img/g1.jpg",
    "img/g3.jpg",
    "img/g5 (8).jpg",
    "img/g5 (3).jpg",
    "img/g5 (5).jpg",
    "img/g2.jpg",
    "img/g4.jpg",
  ];

  return (
    <div className="relative w-full h-screen flex flex-col justify-start items-center mt-5">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center backdrop-blur-lg"
        style={{ backgroundImage: "url('/img/gallf.jpg')", filter: "blur(8px)" }}
      ></div>

      {/* Tagline Positioned at the Top Center */}
      <div className="relative z-10 mt-20">
        <div className="py-4 px-8 bg-white/20 backdrop-blur-xl rounded-xl shadow-xl border border-[#5A3E36]">
          <h2 className={`text-4xl md:text-5xl text-[#5A3E36] text-center ${dancingScript.className}`}>
            Our Specials
          </h2>
        </div>
      </div>

      {/* Spacer to Push Carousel Below */}
      <div className="mt-12"></div>

      {/* Carousel Wrapper */}
      <div className="relative z-10 w-full max-w-4xl">
        <Carousel>
          <CarouselContent className="md:-ml-4">
            {images.map((src, index) => (
              <CarouselItem key={index} className="md:basis-1/3">
                <img
                  src={src}
                  alt={`Special ${index + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default GalleryComponent;
