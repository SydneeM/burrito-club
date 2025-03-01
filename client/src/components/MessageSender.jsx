import { memo, useState } from 'react';

const MessageSender = memo(function MessageSender({ socket, curRoom, curUser }) {
  const [message, setMessage] = useState('');

  return (
    <div className='flex flex-row justify-between gap-x-2 h-fit'>
      <input
        className='p-3 w-10/12 rounded-3xl focus:outline-0'
        id='msg-input'
        autoComplete='off'
        value={message}
        placeholder='Message'
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className='p-3 w-2/12 min-w-fit rounded-3xl submit-btn'
        onClick={() => {
          if (message !== '' && message.trim().length !== 0) {
            const time = Date.now();
            const newMessage = { message, username: curUser, room: curRoom, time, };
            socket.emit('send_message', newMessage);
            setMessage('');
          }
        }}>
        Send
      </button>
    </div>
  );
});

export default MessageSender
