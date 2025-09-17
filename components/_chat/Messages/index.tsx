import { UIMessage } from "ai";
import clsx from "clsx";
import React from "react";

type MessageContainerProps = {
  messages: UIMessage[];
  status: "idle" | "connecting" | "connected" | "submitted" | "streaming" | "error" | string; // keep loose for SDK changes
};

type RoleType = "assistant" | "user";

type BasePart = { type: string; state?: "done" | "in_progress" | "partial"; text?: string };
type TextPart = BasePart & { type: "text"; text: string };
type ReasoningPart = BasePart & { type: "reasoning" };
type StepStartPart = BasePart & { type: "step-start" };

type PartsType = Array<TextPart | ReasoningPart | StepStartPart>;

type MessageProps = {
  role: RoleType;
  parts: PartsType;
};

const hasAnyAssistantText = (parts: PartsType) =>
  parts?.some((p) => p.type === "text" && typeof p.text === "string" && p.text.length > 0);

const isAssistantThinkingOnly = (parts: PartsType) => {
  // No text yet, but has step/reasoning parts → show loader
  const noText = !hasAnyAssistantText(parts);
  const hasStepOrReasoning = parts?.some((p) => p.type === "step-start" || p.type === "reasoning");
  return noText && hasStepOrReasoning;
};

const last = <T,>(arr: T[]) => (arr.length ? arr[arr.length - 1] : undefined);

const MessageContainer: React.FC<MessageContainerProps> = ({ messages, status }) => {
  const lastMsg = last(messages);
  const shouldShowAssistantLoader =
    status === "streaming" &&
    lastMsg?.role === "assistant" &&
    lastMsg?.parts &&
    isAssistantThinkingOnly(lastMsg.parts as PartsType);

  return (
    <section className="relative w-full max-w-[1000px] space-y-6 mx-auto overflow-y-auto grid grid-cols-1 justify-items-stretch mb-32">
      {messages.map((message) => (
        <Message
          key={message.id}
          role={message.role as RoleType}
          parts={message.parts as PartsType}
        />
      ))}

      {shouldShowAssistantLoader && <AssistantLoading />}
    </section>
  );
};

export default MessageContainer;

export const Message: React.FC<MessageProps> = ({ role, parts }) => {
  return (
    <div className="rounded-xl border border-gray-200 p-3 bg-white">
      <div className={clsx("text-lg px-1 py-0.5")}>
        {parts?.map((part, index) => {
          // USER: render plain text as-is
          if (part.type === "text" && role === "user") {
            return (
              <span key={index} className="whitespace-pre-wrap break-words">
                {part.text}
              </span>
            );
          }

          // ASSISTANT: you already return HTML here
          if (part.type === "text" && role === "assistant") {
            return (
              <span
                key={index}
                className="prose prose-sm sm:prose-base max-w-none"
                dangerouslySetInnerHTML={{ __html: part.text }}
              />
            );
          }

          // Hide non-text parts from the visible UI,
          // but you could put subtle indicators if desired.
          return null;
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
        <div className="capitalize">{role}</div>
      </div>
    </div>
  );
};

const AssistantLoading: React.FC = () => {
  return (
    <div className="rounded-xl border border-gray-200 p-3 bg-white">
      <div className="flex items-start gap-3">
        <div className="mt-2">
          {/* typing dots */}
          <span className="inline-flex gap-1">
            <Dot />
            <Dot delay="150ms" />
            <Dot delay="300ms" />
          </span>
        </div>
      </div>

      {/* optional skeleton for “about to render rich text” */}
      <div className="mt-3 space-y-2">
        <div className="h-3 w-11/12 bg-gray-100 animate-pulse rounded" />
        <div className="h-3 w-10/12 bg-gray-100 animate-pulse rounded" />
        <div className="h-3 w-7/12 bg-gray-100 animate-pulse rounded" />
      </div>
    </div>
  );
};

const Dot: React.FC<{ delay?: string }> = ({ delay = "0ms" }) => (
  <span
    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce inline-block"
    style={{ animationDelay: delay }}
  />
);
