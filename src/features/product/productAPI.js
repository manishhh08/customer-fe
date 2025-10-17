import { apiProcessor } from "../../utils/axiosHelper";

const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

//fetch all products
export const fetchAllProducts = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/products`,
    isPrivate: true,
  });
};
