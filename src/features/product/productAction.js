import { setLoading } from "../customer/customerSlice";
import {
  fetchAllProducts,
  fetchProductsBySubCategoryApi,
  getFeaturedProductsApi,
} from "./productAPI";
import { setProducts } from "./productSlice";

export const fetchAllProductsAction = () => async (dispatch) => {
  try {
    const response = await fetchAllProducts();
    if (response.status === "success") {
      dispatch(setProducts(response.products));
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const fetchFeaturedProductsAction = async () => {
  const result = await getFeaturedProductsApi();
  if (result.status === "success")
    return {
      bestSellerProducts: result.bestSellerProducts,
      recentlyAddedProducts: result.recentlyAddedProducts,
    };
};

export const fetchProductsBySubCategoryAction =
  (categorySlug, subCategorySlug) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const products = await fetchProductsBySubCategoryApi(
        categorySlug,
        subCategorySlug
      );
      dispatch(setProducts(products)); // products is the filtered array
    } catch (error) {
      console.error("Failed to fetch subcategory products:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
