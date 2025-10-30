import { subscribeCustomerApi } from "./subscribeAPI";

export const subscribeCustomerAction = async (
  email,
  setEmail,
  setMessage,
  setLoading
) => {
  setLoading(true);
  setMessage("");

  try {
    const { status, message } = await subscribeCustomerApi(email);
    if (status === "success") {
      setMessage("🎉 You’re subscribed! Check your inbox.");
      setEmail("");
    } else {
      setMessage(message || "Something went wrong.");
    }
  } catch (error) {
    console.error("Subscribe action error:", error);
    setMessage("Server error. Please try again later.");
  } finally {
    setLoading(false);
  }
};
