// src/features/review/reviewAPI.js
import { apiProcessor } from "../../utils/axiosHelper.js"; // adjust path if needed

const reviewEP = "/reviews"; // base endpoint (change if your backend uses different route)

// ========== PRIVATE API CALLS (with auth) ==========
export const createReview = async (data) => {
  const obj = {
    method: "POST",
    url: reviewEP,
    data,
    isPrivate: true,
  };
  return await apiProcessor(obj);
};

export const fetchReviews = async () => {
  const obj = {
    method: "GET",
    url: reviewEP,
    isPrivate: true,
  };
  return await apiProcessor(obj);
};

// ========== PUBLIC API CALL ==========
export const fetchPublicReviews = async () => {
  const obj = {
    method: "GET",
    url: reviewEP + "/public",
  };
  return await apiProcessor(obj);
};
