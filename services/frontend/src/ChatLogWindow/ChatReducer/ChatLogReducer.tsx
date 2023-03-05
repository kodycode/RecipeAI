import React from 'react';
import { type ChatAction, type ChatState } from '../ChatTypes/ChatTypes';

const formatUserMessage = (chatLogLength: number, userMessage: string): JSX.Element => (
  <div key={`${chatLogLength}`} className='user-chat-message-container'>
    <p>You - {userMessage}</p>
  </div>
);

const formatBotMessage = (chatLogLength: number, botMessage: string): JSX.Element => (
  <div key={`${chatLogLength}`} className='bot-chat-message-container'>
    <p>Bot - {botMessage}</p>
  </div>
);

export const chatLogReducer = (state: ChatState, action: ChatAction): any => {
  switch (action.type) {
    case 'add_user_message': {
      const normalizedUserMessage = formatUserMessage(state.chatLog.length, action.payload);
      return {
        chatLog: [normalizedUserMessage, ...state.chatLog]
      };
    }
    case 'add_bot_message': {
      const normalizedBotMessage = formatBotMessage(state.chatLog.length, action.payload);
      return {
        chatLog: [normalizedBotMessage, ...state.chatLog]
      };
    }
    default:
      throw new Error();
  }
};
