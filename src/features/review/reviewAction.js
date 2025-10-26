import { toast } from "react-toastify";
import { createNewReview } from "./reviewAPI";
export const createReviewAction = (data) => async () => {
  try {
    const result = await createNewReview(data);
    if (result?.status === "success") {
      toast.success("Review submitted successfully!");
    } else {
      toast.error(result.message || "Failed to submit review");
    }
  } catch (error) {
    toast.error(error.message || "Server Error");
  }
};
