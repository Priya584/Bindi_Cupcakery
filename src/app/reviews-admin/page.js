import ReviewOverviewAdmin from "@/components/review-overview-admin";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function fetchListOfReviews() {
  try {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-review`, {
      method: "GET",
      cache: "no-store",
    });
    const result = await apiResponse.json();
    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
}



export default async function ReviewPageAdmin() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role ?? undefined;

  if (role !== "admin") {
    redirect("/");
  }

  const reviewList = await fetchListOfReviews();

  return (
      <ReviewOverviewAdmin reviewList={reviewList}/>
   
  );
}
