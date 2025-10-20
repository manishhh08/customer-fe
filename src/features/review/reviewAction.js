// src/features/review/reviewAction.js
import { toast } from "react-toastify";
import { createReview, fetchReviews, fetchPublicReviews } from "./reviewAPI";
import { setReviews, setPubReviews } from "./reviewSlice";

// ========== ADD NEW REVIEW ==========
export const createReviewAction = (data) => async (dispatch) => {
  try {
    const result = await createReview(data);
    if (result?.status === "success") {
      toast.success("Review added successfully!");
      // Optionally fetch updated reviews
      dispatch(fetchReviewsAction());
    }
  } catch (error) {
    toast.error(error.message || "Failed to add review");
  }
};

// ========== FETCH PRIVATE REVIEWS ==========
export const fetchReviewsAction = () => async (dispatch) => {
  try {
    const result = await fetchReviews();
    if (result?.status === "success") {
      dispatch(setReviews(result.data));
    }
  } catch (error) {
    toast.error("Unable to fetch reviews");
  }
};

// ========== FETCH PUBLIC REVIEWS ==========
export const fetchPublicReviewsAction = () => async (dispatch) => {
  try {
    const result = await fetchPublicReviews();
    if (result?.status === "success") {
      dispatch(setPubReviews(result.data));
    }
  } catch (error) {
    toast.error("Unable to load public reviews");
  }
};
