import { UIMessage } from 'ai';
import clsx from 'clsx';

type MessageContainerProps = {
  messages: UIMessage[]
}

type RoleType = 'assistant' | 'user'

type PartsType = {
  type: 'text'
  text: string
}

type MessageProps = {
  role: RoleType
  parts: PartsType[]
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  console.log('messages', messages)
  return (
    <section className="relative space-y-6 mx-auto overflow-y-auto grid grid-cols-1 justify-items-stretch">
      {messages.map((message, index) => (
        <Message key={index} role={message.role as RoleType} parts={message.parts as PartsType[]} />
      ))}
    </section>
  )
};

export default MessageContainer;

export const Message: React.FC<MessageProps> = ({
  role,
  parts
}) => {
  return (
    <div>
      <div
        className={clsx('text-lg px-3 py-1', {
          ['justify-self-start bg-darkGrey text-foreground']: role === 'assistant',
          ['justify-self-end bg-foreground text-background']: role === 'user',
        })}
      >{parts?.map((part) => {
        if (part.type === 'text') {
          return part.text
        }
      })}</div>
      <div
        className='flex items-center justify-between text-sm text-darkGrey mt-1'
      >
        <div>{ role }</div>
        <div></div>
      </div>
    </div>
  )
}
