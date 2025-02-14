import connectToDB from "@/database"; // Ensure this connects to MongoDB
import Review from "@/models/review";
import Joi from "joi";
import { NextResponse } from "next/server";

// Define Joi schema for validation
const ReviewSchema = Joi.object({
    user: Joi.string().required(),
    reviewText: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
});

export async function POST(req) {
    try {
        await connectToDB();

        // Extract review data from request
        const extractReviewData = await req.json();
        const { user, reviewText, rating } = extractReviewData;

        // Validate using Joi
        const { error } = ReviewSchema.validate({ user, reviewText, rating });
        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            });
        }

        // Create new review entry
        const newReview = await Review.create(extractReviewData);
        if (newReview) {
            return NextResponse.json({
                success: true,
                message: "Review submitted for approval!"
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong..."
            });
        }
    } catch (error) {
        console.error("Error adding review:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
}
