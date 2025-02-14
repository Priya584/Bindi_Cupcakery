"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, Fragment } from "react";

export const AddNewReview = ({ openReviewDialog, setOpenReviewDialog, loading, reviewFormData, setReviewFormData, handleSaveReview }) => {
    return (
        <Fragment>
            <div>
                <Button onClick={() => setOpenReviewDialog(true)}>Add Review</Button>
            </div>

            <Dialog open={openReviewDialog} onOpenChange={() => {
                setOpenReviewDialog(false);
                setReviewFormData({
                    user: "",
                    reviewText: "",
                    rating: ""
                });
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Your Review</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="user" className="text-center">
                                Name
                            </Label>
                            <Input
                                name="user"
                                placeholder="Enter your name"
                                value={reviewFormData?.user || ""}
                                onChange={(e) => setReviewFormData({ ...reviewFormData, user: e.target.value })}
                                id="user"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reviewText" className="text-center">
                                Review
                            </Label>
                            <Input
                                name="reviewText"
                                placeholder="Enter your review"
                                value={reviewFormData?.reviewText || ""}
                                onChange={(e) => setReviewFormData({ ...reviewFormData, reviewText: e.target.value })}
                                id="reviewText"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rating" className="text-center">
                                Rating
                            </Label>
                            <Input
                                name="rating"
                                type="number"
                                placeholder="Enter rating (1-5)"
                                value={reviewFormData?.rating || ""}
                                onChange={(e) => setReviewFormData({ ...reviewFormData, rating: e.target.value })}
                                id="rating"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleSaveReview}>
                            {loading ? "Submitting..." : "Submit Review"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};
