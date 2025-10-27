import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

// Create Review
export const createNewReview = async (data) => {
  return apiProcessor({
    method: "post",
    url: `${apiUrl}/reviews`,
    isPrivate: true,
    data,
  });
};

// Get all active reviews for a specific product
export const getReviewsByProductApi = (productId) => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/reviews/product/${productId}`,
  });
};
