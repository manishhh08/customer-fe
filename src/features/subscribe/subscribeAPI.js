import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

export const subscribeCustomerApi = async (email) => {
  return apiProcessor({
    method: "post",
    url: `${apiUrl}/subscribe`,
    data: { email },
    isPrivate: false,
  });
};
