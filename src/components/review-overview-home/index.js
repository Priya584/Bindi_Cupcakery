"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { Dancing_Script, Playfair_Display, Nunito } from "next/font/google";
import { useRouter } from "next/navigation";
import { AddNewReview } from "../add-new-review";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["300", "600"] });

export default function ReviewsOverviewHome() {
    const [reviews, setReviews] = useState([]);
    const [openReviewDialog, setOpenReviewDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const [reviewFormData, setReviewFormData] = useState({ user: "", reviewText: "", rating: "" });
    const router = useRouter();

    useEffect(() => {
        router.refresh();
        fetchApprovedReviews();
    }, []);
    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    async function fetchApprovedReviews() {
        try {
            const response = await fetch("/api/get-review");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                setReviews(data.data.filter(review => review.approved));
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    const handleSaveReview = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/add-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewFormData),
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            if (data.success) {
                setOpenReviewDialog(false);
                setReviewFormData({ user: "", reviewText: "", rating: "" });
                setShowThankYou(true);
                fetchApprovedReviews();
                setTimeout(() => setShowThankYou(false), 3000);
            }
        } catch (error) {
            console.error("Error adding review:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/img/review.jpg')", backgroundAttachment: "fixed" }}
            >
                <div className="absolute inset-0 bg-black opacity-75 z-20"></div>
            </div>

            <div className="relative flex flex-col items-center w-full h-full justify-center px-6 z-50">
                <div className="py-4 px-8 bg-white/30 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 mb-4">
                    <h2 className={`text-3xl md:text-5xl text-[#F4E3D7] text-center ${dancingScript.className} drop-shadow-lg`}>
                        Customer Reviews
                    </h2>
                </div>



                <AddNewReview openReviewDialog={openReviewDialog} setOpenReviewDialog={setOpenReviewDialog} loading={loading} setLoading={setLoading} reviewFormData={reviewFormData} setReviewFormData={setReviewFormData} handleSaveReview={handleSaveReview} />

                {showThankYou && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                        <p className="font-bold">Thank you for your review!</p>
                    </div>
                )}

                <div className="relative w-full max-w-4xl flex justify-center items-center">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 p-3 bg-[#B87534] hover:bg-[#C47F39] text-amber-100 rounded-full z-20 transition-transform active:scale-90"
                    >
                        <FaArrowLeft size={20} />
                    </button>
                    <div className="flex overflow-hidden w-full justify-center">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute w-64 md:w-80 h-auto p-6 bg-white shadow-lg rounded-xl transition-transform flex flex-col justify-center items-center"
                                    animate={{
                                        x: `${(index - current) * 280}px`,
                                        scale: index === current ? 1.1 : 0.9,
                                        opacity: index === current ? 1 : 0.5,
                                    }}
                                    onClick={() => setCurrent(index)}
                                >
                                    <h3 className={`text-xl font-bold mb-2 text-center text-[#4c2b08] ${playfairDisplay.className}`}>
                                        {review.user}
                                    </h3>
                                    <p className={`text-[#7a573b] text-center leading-relaxed ${nunito.className}`}>
                                        {review.reviewText}
                                    </p>
                                    <div className="flex mt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={`text-xl ${i < review.rating ? "text-[#4c2b08]" : "text-gray-300"}`} />
                                        ))}
                                    </div>
                                </motion.div>

                            ))
                        ) : (
                            <Label className="text-2xl font-bold text-white">No Reviews Yet!</Label>
                        )}
                    </div>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 p-3 bg-[#da892cd6] text-amber-100 rounded-full z-20"
                    >
                        <FaArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
