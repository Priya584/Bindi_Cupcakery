"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import { Dancing_Script, Playfair_Display, Nunito } from "next/font/google";
import AddToCardButton from "../add-to-cart-button";
import { ImageIcon } from "lucide-react";


// Load fonts
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600"] });

export default function MenuOverviewHome({ menuList }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, [router]);

  // Extract unique categories
  const uniqueCategories = Array.from(new Set(menuList.map(item => item.Category)));

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
      <div  className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-xl rounded-xl px-8 py-4 mt-10 shadow-xl border border-white/30 z-50">
        <h1 data-aos="zoom-out" className={`text-3xl md:text-4xl text-[#E8C27E] text-center font-bold ${dancingScript.className}`}>
          What's on your mind today?
        </h1>
      </div>

      <div className="relative w-full max-w-[1050px] mx-auto py-10 mt-72 sm:mt-64 px-8 bg-[#f0e7de] rounded-lg shadow-lg z-20 mb-10
  lg:w-full lg:mx-[10px] 
  md:w-[90%] md:px-6 md:mx-auto
  sm:w-[95%] sm:px-4 sm:mx-auto
  xs:w-[98%] xs:px-3 xs:mx-auto">
        <div className="flex flex-col gap-16">
          {uniqueCategories.map((category, index) => {
            const categoryItems = menuList.filter(item => item.Category === category);
            const animation = index % 2 === 0 ? "fade-right" : "fade-left";

            return (
              <div 
                key={category} 
                data-aos={animation} 
                className={`md:flex md:items-center items-center w-[100%] justify-around gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Category Image */}
                <div className="w-[95%] h-72 rounded-lg overflow-hidden mt-20
  lg:w-[35%] md:w-[35%] sm:w-[50%]">
                  <img src={`/img/menu/${categoryItems[0]?.Category}.jpg`} alt={category} className="w-full h-full object-cover" />
                </div>

                {/* Category & Items */}
                <div className="sm:w-[50%]">
                  <div className=" text-[#4E342E] text-center mb-4 mt-6 md:mt-0 w-fit">
                    <h2 className={`text-[65px] font-bold ${dancingScript.className}`}>{category}</h2>
                  </div>

                  <div className="max-h-[260px] overflow-y-auto pr-2 rounded-lg p-3 scrollbar-thin scrollbar-thumb-[#8B5E3B] scrollbar-track-[#E6C7B2]">
                    {categoryItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-lg font-medium py-2 border-b border-[#d6b39a]">
                        <a href={item.Pic} target="_blank" rel="noopener noreferrer">
                          <ImageIcon
                            src={item.photo}
                            alt={item.item}
                            width={40}
                            height={40}
                            className="w-6 h-6 mr-4 mx-2 text-[#24160e]"
                          />
                        </a>
                        <div className={`text-[#34170d] w-1/2 mx-2 text-base ${nunito.className}`}>{item.Item}</div>
                        <div className="text-[#34170d] w-1/4 mx-2 text-center text-base">₹ {item.Price}</div>
                        <AddToCardButton productItem={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/img/trymenu.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
    </div>
  );
}
