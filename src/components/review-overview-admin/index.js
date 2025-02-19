"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { Dancing_Script, Playfair_Display, Nunito } from "next/font/google";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["300", "600"] });

export default function Reviews({ reviewList }) {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setReviews(reviewList);
  }, [router]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  async function toggleApproval(reviewId, currentStatus) {
    try {
      const response = await fetch("/api/approve-review", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId, approved: !currentStatus }),
      });

      const result = await response.json();
      if (result.success) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId ? { ...review, approved: !review.approved } : review
          )
        );
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error toggling approval:", error);
      alert("Something went wrong! Please try again.");
    }
  }

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/review.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-75 z-20"></div>
      </div>

      {/* Blur Overlay */}


      {/* Content */}
      <div className="relative flex flex-col items-center w-full h-full justify-center px-6 z-50">
        {/* Heading */}
        <div data-aos="zoom-out" className="py-4 px-8 bg-white/30 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 mb-16">
          <h2
            className={`text-3xl md:text-5xl text-[#F4E3D7] text-center ${dancingScript.className} drop-shadow-lg`}
          >
            From Our Customers
          </h2>
        </div>

        {/* Review Cards */}
        <div className="relative w-full max-w-4xl flex justify-center items-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 p-3 bg-[#B87534] hover:bg-[#C47F39] text-amber-100 rounded-full z-20 transition-transform active:scale-90"
          >
            <FaArrowLeft size={20} />
          </button>

          <div className="flex overflow-hidden w-full justify-center">
            {reviews.length > 0 &&
              reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  className="absolute w-64 md:w-80 h-auto p-6 bg-white shadow-lg rounded-xl transition-transform flex flex-col justify-center items-center"
                  animate={{
                    x: `${(index - current) * 280}px`,
                    scale: index === current ? 1.1 : 0.9,
                    opacity: index === current ? 1 : 0.5,
                  }}

                  onClick={() => setCurrent(index)}
                >
                  <h3
                    className={`text-xl font-bold mb-2 text-center text-[#4c2b08] ${playfairDisplay.className}`}
                  >
                    {review.user}
                  </h3>
                  <p className={`text-[#7a573b] text-center leading-relaxed ${nunito.className}`}>
                    {review.reviewText}
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xl ${i < review.rating ? "text-[#4c2b08]" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="flex px-7 mt-6 gap-9 items-center">
                    <Button
                      onClick={() => toggleApproval(review._id, review.approved)}
                      variant={review.approved ? "failure" : "pass"}
                    >
                      {review.approved ? "Approved" : "Not Approved"}
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 p-3 bg-[#B87534] hover:bg-[#C47F39] text-amber-100 rounded-full z-20 transition-transform active:scale-90"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
