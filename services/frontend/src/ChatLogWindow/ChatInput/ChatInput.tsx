import React, { useState } from 'react';
import { type ChatInputProps } from '../ChatTypes/ChatTypes';
import './ChatInput.css';

/* Component for the Chat Input section below ChatDisplay */
export const ChatInput = ({ chatLog, handleChatInputEntered }: ChatInputProps): JSX.Element => {
  // regex to check if input contains any alphanumeric characters before sending request
  const alphanumericRegex = /[a-z0-9]/i;
  const [currentTextInput, setCurrentTextInput] = useState('');

  // We only allow text inputs after a bot sends a response, or if it's the initial message
  const setTextInputValue = (event: React.FormEvent<HTMLInputElement>): void => {
    if (chatLog.length % 2 === 0) setCurrentTextInput((event.target as HTMLInputElement).value);
  };

  // Handles Enter key down event for text input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      processChatInputEntered();
    }
  };

  const processChatInputEntered = (): void => {
    // In the first condition, we check if we've gotten a response from the bot
    // before we send another input, and we also check if there's an alphanumeric
    // character in the input so we're not just sending whitespace
    if (chatLog.length % 2 === 0 && alphanumericRegex.test(currentTextInput)) {
      handleChatInputEntered(currentTextInput);
      setCurrentTextInput('');
    }
  };

  return (
    <div className='chat-input-container'>
      <input
        className={chatLog.length % 2 === 0 ? 'chat-input' : 'chat-input-disabled'}
        type="text"
        placeholder="> Enter an ingredient"
        onInput={e => { setTextInputValue(e); }}
        onKeyDown={e => { handleKeyDown(e); }}
        value={currentTextInput}
      />
      <button
        className='submit-btn'
        onClick={() => { processChatInputEntered(); }}
      >
        <b>Submit</b>
      </button>
    </div>
  );
};
