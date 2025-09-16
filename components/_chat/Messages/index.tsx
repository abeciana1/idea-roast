import { UIMessage } from "ai";
import clsx from "clsx";

type MessageContainerProps = {
  messages: UIMessage[];
};

type RoleType = "assistant" | "user";

type PartsType = {
  type: "text";
  text: string;
};

type MessageProps = {
  role: RoleType;
  parts: PartsType[];
};

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  return (
    <section className="relative w-full max-w-[1000px] space-y-6 mx-auto overflow-y-scroll grid grid-cols-1 justify-items-stretch mb-32">
      {messages.map((message, index) => (
        <Message
          key={index}
          role={message.role as RoleType}
          parts={message.parts as PartsType[]}
        />
      ))}
    </section>
  );
};

export default MessageContainer;

export const Message: React.FC<MessageProps> = ({ role, parts }) => {
  return (
    <div className="">
      <div className={clsx("text-lg px-3 py-1")}>
        {parts?.map((part, index) => {
          if (part.type === "text" && role === "user") {
            return part.text;
          } else if (part.type === "text" && role === "assistant") {
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: part.text }}
              />
            );
          }
        })}
      </div>
      <div className="flex items-center justify-between text-sm text-darkGrey mt-1">
        <div className="capitalize">{role}</div>
        <div></div>
      </div>
    </div>
  );
};
