import React, { useReducer } from 'react';
import './ChatLogWindow.css';

import { ChatDisplay } from './ChatDisplay';
import { ChatInput } from './ChatInput';
import { ChatActionTypes, type ChatState } from './ChatTypes/ChatTypes';
import { chatLogReducer } from './ChatReducer';

/* Contains both ChatDisplay and the ChatInput as well as the shared state */
export const ChatLogWindow = (): JSX.Element => {
  const initialState: ChatState = {
    chatLog: [] as JSX.Element[]
  };
  const [state, dispatch] = useReducer(chatLogReducer, initialState);

  // Fetches the recipe given the ingredient prompt inputted from the user
  // and also adds the chat message to the bot
  const fetchRecipe = (ingredientPrompt: string): void => {
    const ipAddr = process.env.IS_DOCKER_ENV === 'y' ? 'mongo' : 'localhost';
    fetch(`http://${ipAddr}:8080/generate-recipe`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredientPrompt
      })
    }).then(async response => {
      return await response.json();
    }).then(responseJson => {
      const recipe = responseJson.data;
      dispatch({ type: ChatActionTypes.ADD_BOT_MESSAGE, payload: recipe });
    }).catch(() => {});
  };

  // Formats the ingredient into a prompt and adds the message into the chat log
  const handleChatInputEntered = (ingredientInput: string): void => {
    const ingredientPrompt = `Give me a food recipe given this ingredient: ${ingredientInput}`;
    fetchRecipe(ingredientPrompt);
    dispatch({ type: ChatActionTypes.ADD_USER_MESSAGE, payload: ingredientPrompt });
  };

  return (
    <div className='chat-log-window'>
      <div className='chat-widget-container'>
        <ChatDisplay chatLog={state.chatLog} />
        <ChatInput chatLog={state.chatLog} handleChatInputEntered={handleChatInputEntered} />
      </div>
    </div>
  );
};
