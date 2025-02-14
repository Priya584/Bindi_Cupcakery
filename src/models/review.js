import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    approved: {
        type: Boolean,
        default: true // Default: Not approved
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
