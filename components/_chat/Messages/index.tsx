"use client";
import { useChat } from "@ai-sdk/react";

const MessageContainer = () => {
  const { messages } = useChat();
  console.log('messages', messages)
  return <section className="relative space-y-6 mx-auto overflow-y-auto"></section>;
};

export default MessageContainer;
