
"use client";
import { Typewriter } from "react-simple-typewriter";
import { Prata, Poppins } from "next/font/google";

// Load fonts
const prata = Prata({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function Hero() {
  return (
    <div className="text-center mt-32 pt-32">
      <h1 className={`text-4xl md:text-6xl lg:text-7xl mb-8 mt-[-40px] relative ${prata.className}`} style={{ color: "#f5f5dc" }}>
        <Typewriter
          words={["Welcome To Bindi's Cupcakery!"]}
          loop={1}
          cursor
          typeSpeed={100}
          deleteSpeed={50}
        />
      </h1>
      <p className={`text-lg mt-6 text-[#FED8A6] ${poppins.className}`}>
        Where every bite tells a story of sweetness, and every cupcake is crafted with love and passion.
      </p>
    </div>
  );
}
