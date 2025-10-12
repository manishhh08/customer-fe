import { fetchAllCategories } from "./categoryAPI";
import { setCategories, setLoading, setError } from "./categorySlice";

export const fetchAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await fetchAllCategories();

    if (response.status === "success") {
      dispatch(setCategories(response.categories));
    } else {
      dispatch(setError(response.message || "Unable to fetch categories"));
    }
  } catch (error) {
    dispatch(
      setError(error.message || "Network error while fetching categories")
    );
  }
};
