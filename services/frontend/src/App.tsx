import React from 'react';
import './App.css';

import { ChatLogWindow } from './ChatLogWindow';

function App (): JSX.Element {
  return (
    <div className="App">
      <h1 className='recipeai-header'>RecipeAI</h1>
      <div>
        <ChatLogWindow />
      </div>
    </div>
  );
};

export default App;
