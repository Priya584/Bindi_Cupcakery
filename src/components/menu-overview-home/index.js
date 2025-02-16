"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dancing_Script, Playfair_Display } from "next/font/google";
import AddToCardButton from "../add-to-cart-button";
import { ImageIcon } from "lucide-react";

// Load fonts
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

export default function MenuOverviewHome({ menuList }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  // Extract unique categories
  const uniqueCategories = Array.from(new Set(menuList.map(item => item.Category)));

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-xl rounded-xl px-8 py-4 mt-10 shadow-xl border border-white/30 z-50">
        <h1 className={`text-3xl md:text-4xl text-[#E8C27E] text-center font-bold ${dancingScript.className}`}>
          What's on your mind today?
        </h1>
      </div>

      <div className="relative w-[calc(100%-400px)] mx-auto py-10 mt-56 px-8 bg-[#F3E5D8] rounded-lg shadow-lg z-20">
        <div className="flex flex-col gap-16">
          {uniqueCategories.map((category, index) => {
            const categoryItems = menuList.filter(item => item.Category === category);

            return (
              <div key={category} className={`flex items-center justify-between gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                
                {/* Category Image */}
                <div className="w-[45%] h-72 rounded-lg overflow-hidden mt-20">
                  <img src={`/img/menu/${categoryItems[0]?.Category}.jpg`} alt={category} className="w-full h-full object-cover" />
                </div>

                {/* Category & Items */}
                <div className="w-1/2">
                  <div className=" bg-[#4E342E] text-[#F5DEB3] rounded-lg shadow-md text-center px-6 py-2 mb-4  w-fit">
                    <h2 className={`text-3xl font-bold ${dancingScript.className}`}>{category}</h2>
                  </div>

                  <div className="max-h-[260px] overflow-y-auto pr-2 rounded-lg p-3 scrollbar-thin scrollbar-thumb-[#8B5E3B] scrollbar-track-[#E6C7B2]">
                    {categoryItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-lg font-medium py-2 border-b border-[#d6b39a]">
                        <a href={item.Pic} target="_blank" rel="noopener noreferrer"><ImageIcon
                            src={item.photo}
                            alt={item.item}
                            width={40}
                            height={40}
                            className="w-6 h-6 mr-4 text-[#24160e]"
                          /></a>
                        <div className="text-[#34170d] w-1/2 text-base">{item.Item}</div>
                        <div className="text-[#D2691E] w-1/4 text-center text-base">₹ {item.Price}</div>
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
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>
    </div>
  );
}
