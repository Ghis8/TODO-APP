import React from 'react';

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isOutgoing: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, timestamp, isOutgoing }) => {
  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow ${
          isOutgoing ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <p className="text-sm">{message}</p>
        <span className="text-xs text-gray-400 block mt-1 text-right">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;