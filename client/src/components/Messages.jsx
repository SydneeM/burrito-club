import { useEffect, useRef } from 'react';

function Messages({ messages, curUser }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='flex flex-col gap-y-4 h-[30vh] grow overflow-y-auto'>
      {messages.map((messageInfo) => (
        <div
          className={curUser === messageInfo.username ? 'flex flex-col w-fit max-w-3/4 self-end' : 'flex flex-col w-fit max-w-3/4 self-start'}
          key={`${messageInfo.username}-${messageInfo.time}`}
        >
          {curUser !== messageInfo.username &&
            <span className='text-sm text-start ml-2'>{messageInfo.username}</span>
          }
          <span
            id={curUser === messageInfo.username ? 'cur-user-msg' : 'other-user-msg'}
            className='px-4 py-2 rounded-2xl break-words text-black text-left'
          >
            {messageInfo.message}
          </span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages
