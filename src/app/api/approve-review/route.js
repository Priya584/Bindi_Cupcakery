import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Review from "@/models/review";

export async function PATCH(req) {
  try {
    await connectToDB();
    const { reviewId, approved } = await req.json();

    if (!reviewId) {
      return NextResponse.json({ success: false, message: "Review ID is required" }, { status: 400 });
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, { approved }, { new: true });

    if (!updatedReview) {
      return NextResponse.json({ success: false, message: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Review status updated", data: updatedReview });
  } catch (error) {
    console.error("Error updating review approval:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
