import { apiProcessor } from "../../utils/axiosHelper";

const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

//fetch all products
export const fetchAllProducts = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/products`,
  });
};

export const getFeaturedProductsApi = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/products/featured-products`,
  });
};
export const fetchProductsBySubCategoryApi = async (
  categorySlug,
  subCategorySlug
) => {
  const response = await apiProcessor({
    method: "get",
    url: `${apiUrl}/products/${categorySlug}/${subCategorySlug}`,
  });

  return response.data.products;
};
