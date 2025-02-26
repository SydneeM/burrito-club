import { memo, useState } from 'react';

const MessageSender = memo(function MessageSender({ socket, curRoom, curUser }) {
  const [message, setMessage] = useState('');

  return (
    <div className='flex flex-row p-4 justify-between gap-x-2 h-fit'>
      <input
        className='p-3 w-10/12 rounded-3xl'
        id='msg-input'
        value={message}
        placeholder='Message'
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className='p-3 w-2/12 min-w-fit rounded-3xl submit-btn'
        onClick={() => {
          if (message !== '' && message.trim().length !== 0) {
            const time = Date.now();
            const state = { message, username: curUser, room: curRoom, time, };
            socket.emit('send_message', state);
            setMessage('');
          }
        }}>
        Send
      </button>
    </div>
  );
});

export default MessageSender
