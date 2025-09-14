import { UIMessage } from 'ai';

type MessageContainerProps = {
  messages: UIMessage[]
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  console.log('messages', messages)
  return (
    <section className="relative space-y-6 mx-auto overflow-y-auto"></section>
  )
};

export default MessageContainer;

export const Message = () => {
  return (
    <div></div>
  )
}
