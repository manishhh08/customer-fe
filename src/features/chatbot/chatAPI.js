import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

export const postMessageToChatbot = async (message) => {
  console.log(2222, message);
  return apiProcessor({
    method: "post",
    url: `${apiUrl}/chat`,
    data: { message },
  });
};
