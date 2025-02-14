import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Review from "@/models/review";

export async function GET() {
    try {
        await connectToDB();
        
        // Fetch only reviews approved by the admin
        const approvedReviews = await Review.find({});

        if (approvedReviews.length > 0) {
            return NextResponse.json({
                success: true,
                data: approvedReviews
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "No approved reviews available."
            });
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later."
        });
    }
}
