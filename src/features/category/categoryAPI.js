import { apiProcessor } from "../../utils/axiosHelper";

const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

//retrieve all the categories
export const fetchAllCategories = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/category`,
  });
};

export const fetchCategoryProductsApi = async (slug) => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/category/${slug}`,
  });
};
