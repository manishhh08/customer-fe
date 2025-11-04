import { postMessageToChatbot } from "./chatAPI";

export const postMessageAction = async (message, onChunk, onDone) => {
  try {
    const response = await postMessageToChatbot(message);

    if (!response || response.status !== "success") {
      throw new Error("Chatbot response failed");
    }

    // Send entire message at once

    let formatted = response.text || "";
    const products = response.products || [];

    if (formatted.includes("*")) {
      formatted = formatted
        .split("*") // split by asterisks
        .map((item) => item.trim())
        .filter((item) => item) // remove empties
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n");
    }

    onChunk(formatted);
    onDone({ text: formatted, products });
  } catch (err) {
    console.error("Chatbot action error:", err);
    onChunk("❌ Sorry, something went wrong.");
    onDone();
  }
};
