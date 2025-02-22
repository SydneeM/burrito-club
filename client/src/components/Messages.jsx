import { useEffect, useRef } from 'react';

function Messages({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='h-full overflow-y-scroll' id='messages'>
      {messages.map((messageInfo) => (
        <div
          className='flex flex-col p-2 m-4'
          key={`${messageInfo.username}-${messageInfo.time}`}
        >
          <span>{messageInfo.username}</span>
          <span>{messageInfo.time}</span>
          <span>{messageInfo.message}</span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages
