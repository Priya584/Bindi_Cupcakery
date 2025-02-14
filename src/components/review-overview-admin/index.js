"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function ReviewOverviewAdmin({ reviewList }) {
  const router = useRouter();
  const [reviews, setReviews] = useState(reviewList);

  useEffect(() => {
    router.refresh();
  }, [router]);

  async function toggleApproval(reviewId, currentStatus) {
    try {
      const response = await fetch("/api/approve-review", { // Use relative path
        method: "PATCH", // Change to PATCH for updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId, approved: !currentStatus }),
      });
  
      const result = await response.json();
      console.log("API Response:", result); // Debugging
  
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
    <div className="min-h-screen p-6 flex flex-col gap-10 bg-gray-100">
      <div className="grid mr-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-9">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Card key={index} className="pt-5 px-3">
              <CardContent>
                <CardHeader>
                  <CardTitle className="mb-5">User: {review?.user}</CardTitle>
                  <CardDescription className="mb-5">Review: {review?.reviewText}</CardDescription>
                  <CardTitle className="mb-5">Rating: {review?.rating} ⭐</CardTitle>
                </CardHeader>
                <div className="flex px-7 mt-6 gap-9 items-center">
                  <Button
                    onClick={() => toggleApproval(review._id, review.approved)}
                    variant={review.approved ? "destructive" : "success"}
                  >
                    {review.approved ? "Approved ✅" : "Not Approved ❌"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-6xl font-extrabold">No Reviews Found!</Label>
        )}
      </div>
    </div>
  );
}
