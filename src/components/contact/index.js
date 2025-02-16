
"use client";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { Dancing_Script, Playfair_Display, Nunito } from "next/font/google";

// Load fonts
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["300", "600"] });

export default function Contact() {
  return (
    <section className="py-4 px-4 bg-darkBrown flex justify-center">
      <div className="container mx-auto">
        {/* Contact Us Header */}
        <div className="flex justify-center mb-5">
          <div className="py-4 px-8 bg-white/20 backdrop-blur-xl rounded-xl shadow-xl border border-white/30">
            <h2 className={`text-3xl md:text-4xl text-[#FED8A6] text-center ${dancingScript.className}`}>
              Contact Us
            </h2>
          </div>
        </div>

        {/* Glass Effect Wrapper for Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-10 shadow-lg border border-white/20 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-white">
            {/* Left Section - Contact Info */}
            <div className="flex flex-col items-start space-y-5">
              <ContactItem icon={<Mail className="w-6 h-6" />} title="Email" content="hello@bindiscupcakery.com" />
              <ContactItem icon={<Phone className="w-6 h-6" />} title="Phone" content="+91 123 456 7890" />
            </div>

            {/* Middle Section - Quote / Description */}
            <div className="flex flex-col items-center text-center px-6 py-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/30">
              <p className={`text-lg mt-10 text-[#f7dcb9] italic max-w-md ${playfairDisplay.className}`}>
                "Baked with love, crafted for delight. Reach out to us for sweet moments that last forever!"
              </p>
              <button className="mt-5 px-6 py-3 bg-[#B39977] text-darkBrown font-bold rounded-lg hover:bg-[#f7c48a] transition">
                Get in Touch
              </button>
            </div>

            {/* Right Section - Social Media */}
            <div className="flex flex-col items-end space-y-5">
              <ContactItem icon={<Instagram className="w-6 h-6" />} title="Instagram" content="@bindiscupcakery" />
              <ContactItem icon={<Facebook className="w-6 h-6" />} title="Facebook" content="/bindiscupcakery" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, title, content }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="w-12 h-12 rounded-full bg-peach flex items-center justify-center mb-4">
        <div className="text-[#946d48]">{icon}</div>
      </div>
      <h3 className={`text-xl text-[#f7dcb9] mb-2 ${playfairDisplay.className}`}>{title}</h3>
      <p className={`text-[#f7dcb9] ${nunito.className}`}>{content}</p>
    </div>
  );
}
