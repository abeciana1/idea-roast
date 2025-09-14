"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from 'ai';

const MessageContainer = () => {
  const { messages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/roast'
    })
  });
  console.log('messages', messages)
  return <section className="relative space-y-6 mx-auto overflow-y-auto"></section>;
};

export default MessageContainer;
