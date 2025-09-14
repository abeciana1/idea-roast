"use client";
import { useChat } from "@ai-sdk/react";

const MessageContainer = () => {
  const { messages } = useChat();
  console.log('messages', messages)
  return <section className="space-y-6"></section>;
};

export default MessageContainer;
