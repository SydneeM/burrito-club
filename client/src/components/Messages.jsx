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
    <div className='flex flex-col gap-y-4 h-[30vh] grow overflow-y-scroll'>
      {messages.map((messageInfo) => (
        <div
          className='flex flex-col p-2 rounded-2xl w-fit max-w-3/4 break-words text-black'
          id={curUser === messageInfo.username ? 'cur-user-msg' : 'other-user-msg'}
          key={`${messageInfo.username}-${messageInfo.time}`}
        >
          <p>{messageInfo.username}</p>
          <p>{messageInfo.time}</p>
          <p className='text-left'>{messageInfo.message}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages
