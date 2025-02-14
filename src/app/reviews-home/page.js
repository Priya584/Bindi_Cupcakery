import ReviewsOverviewHome from "@/components/review-overview-home";







export default async function ReviewPageHome() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-black">Review</h1>
      <ReviewsOverviewHome/>
    </div>
  );
}