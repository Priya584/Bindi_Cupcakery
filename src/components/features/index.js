"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

import { Dancing_Script, Playfair_Display, Nunito } from "next/font/google";

// Load fonts
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["300", "600"] });

const features = [
  {
    title: "Artisanal Cupcakes",
    description: "Handcrafted with the finest ingredients for a rich and delightful taste.",
  },
  {
    title: "Customization on Each Item",
    description: "Every treat is personalized to make your special moments even sweeter.",
  },
  {
    title: "Daily Fresh",
    description: "100% Vegetarian & Preservative-Free for Pure Indulgence!",
  },
  {
    title: "Unique Flavors",
    description: "Innovative and delicious combinations that surprise and satisfy.",
  },
  {
    title: "Special Events",
    description: "Perfectly crafted desserts for birthdays, weddings, and celebrations.",
  },
  {
    title: "Local Delivery",
    description: "Enjoy fresh cupcakes delivered straight to your doorstep with care.",
  },
];

export default function Features() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animation only happens once
      easing: "ease-in-out", // Smooth easing
    });
  }, []);

  return (
    <section className="py-20 px-4 bg-chocolate/95 mt-52">
      <div className="container mx-auto">
        {/* Header with Glassmorphism Effect */}
        <div className="flex justify-center mb-16 mt-12">
          <div data-aos="zoom-in" className="bg-white/20 backdrop-blur-xl rounded-xl px-8 py-4 shadow-xl border border-white/30">
            <h2 className={`text-3xl md:text-4xl text-[#E8C27E] text-center ${dancingScript.className}`}>
              Things We Offer
            </h2>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={feature.title} className="flex flex-col items-center text-center" data-aos="fade-up">
              {/* Circular Feature Box */}
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: "#e5d0b1" }}
              >
                <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center text-center px-4">
                  <h3 className={`text-lg leading-tight ${playfairDisplay.className}`} style={{ color: "#4c2b08" }}>
                    {feature.description}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
