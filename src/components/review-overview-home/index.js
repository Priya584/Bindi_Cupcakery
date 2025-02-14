"use client";

import { useEffect, useState } from "react";
import { AddNewReview } from "../add-new-review";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label";

export default function ReviewsOverviewHome() {
    const [reviews, setReviews] = useState([]);
    const [openReviewDialog, setOpenReviewDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [reviewFormData, setReviewFormData] = useState({
        user: "",
        reviewText: "",
        rating: ""
    });

    const router = useRouter();

    useEffect(() => {
        router.refresh();
        fetchApprovedReviews();
    }, []);

    async function fetchApprovedReviews() {
        try {
            const response = await fetch("/api/get-review");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            if (data.success && Array.isArray(data.data)) {
                const approvedReviews = data.data.filter(review => review.approved);
                setReviews(approvedReviews);
            } else {
                console.error("Invalid response format", data);
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

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setOpenReviewDialog(false);
                setReviewFormData({ user: "", reviewText: "", rating: "" });
                setShowThankYou(true);

                // Fetch reviews again after submission
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
        <div className="min-h-screen p-6 flex flex-col gap-10 bg-gray-100">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Customer Reviews</h1>
                <AddNewReview
                    openReviewDialog={openReviewDialog}
                    setOpenReviewDialog={setOpenReviewDialog}
                    loading={loading}
                    setLoading={setLoading}
                    reviewFormData={reviewFormData}
                    setReviewFormData={setReviewFormData}
                    handleSaveReview={handleSaveReview}
                />
            </div>

            {showThankYou && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                    <p className="font-bold">Thank you for your review!</p>
                </div>
            )}

            <div className="grid mr-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-9">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <Card key={index} className="pt-5 px-3">
                            <CardContent>
                                <CardHeader className="flex items-center gap-4">
                                    {/* User Avatar */}
                                   

                                    <div>
                                        <CardTitle className="mb-2">{review.user}</CardTitle>
                                        <CardDescription className="mb-5">{review.reviewText}</CardDescription>
                                        <CardTitle className="mb-5">Rating: {review.rating} ⭐</CardTitle>
                                    </div>
                                </CardHeader>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Label className="text-2xl font-bold">No Reviews Yet!</Label>
                )}
            </div>
        </div>
    );
}
