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
    <div className='h-[30vh] md:grow overflow-y-scroll'>
      {messages.map((messageInfo) => (
        <div
          className='flex flex-col p-2 m-4 rounded-2xl w-fit max-w-3/4 break-words text-black'
          id={curUser === messageInfo.username ? 'cur-user-msg' : 'other-user-msg'}
          key={`${messageInfo.username}-${messageInfo.time}`}
        >
          <span>{messageInfo.username}</span>
          <span>{messageInfo.time}</span>
          <span className='text-left'>{messageInfo.message}</span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages
