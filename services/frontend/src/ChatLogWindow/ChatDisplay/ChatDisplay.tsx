import React, { useEffect, useRef } from 'react';
import { type ChatDisplayProps } from '../ChatTypes/ChatTypes';
import './ChatDisplay.css';

/* Displays the chat logs from this component */
export const ChatDisplay = ({ chatLog }: ChatDisplayProps): JSX.Element => {
  const chatDisplayContainer = useRef<HTMLDivElement>(null);

  // Attaches to the chat window scrollbar to automatically scroll to the bottom
  // whenever a new message is inserted
  useEffect(() => {
    if (chatDisplayContainer != null) {
      if (chatDisplayContainer.current != null) {
        chatDisplayContainer.current.addEventListener('DOMNodeInserted', (event: Event) => {
          const target = (event.target as HTMLElement);
          if (target.parentElement != null) {
            target.parentElement.scrollTop = target.scrollHeight;
          }
        });
      }
    }
  }, []);

  return (
    <div className='chat-display-container' ref={chatDisplayContainer}>
      {chatLog}
    </div>
  );
};
