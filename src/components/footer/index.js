"use client";

import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function Footer() {
  return (
    <footer className="relative bg-[#fffde7] text-black text-center text-lg italic overflow-hidden">
      {/* Scalloped Border Effect */}
      <div className="absolute top-0 left-0 w-full h-[30px] bg-[#f8a8b9] 
                      [mask-image:radial-gradient(circle_at_bottom,#000_10px,transparent_10px)]
                      [mask-size:20px_40px]">
      </div>

      {/* Footer Content */}
      <p className={`mt-2 mb-2 ${playfairDisplay.className} text-center mx-auto flex flex-col sm:flex-row items-center justify-center gap-2`}>
        <div>
          Copyright © 2024. All rights reserved.
          <span className="inline-block animate-bounce">🧁</span>
        </div>
        <div>
          Designed with <span className="inline-block animate-pulse text-red-400">❤</span>

        </div>
      </p>
    </footer>
  );
}
