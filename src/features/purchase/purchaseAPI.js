import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

export const createNewOrder = async (orderObject) => {
  return apiProcessor({
    method: "post",
    url: `${apiUrl}/orders`,
    data: orderObject,
    isPrivate: true,
  });
};
