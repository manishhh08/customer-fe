import { postMessageToChatbot } from "./chatAPI";

export const postMessageAction = async (message, onChunk, onDone) => {
  try {
    const response = await postMessageToChatbot(message);

    if (!response || !response.output) {
      throw new Error("Chatbot response failed");
    }

    // Send entire message at once
    onChunk(response.output);
    onDone();
  } catch (err) {
    console.error("Chatbot action error:", err);
    onChunk("❌ Sorry, something went wrong.");
    onDone();
  }
};
