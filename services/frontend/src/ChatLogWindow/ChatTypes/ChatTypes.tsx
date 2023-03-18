export enum ChatActionTypes {
  ADD_BOT_MESSAGE = 'add_bot_message',
  ADD_USER_MESSAGE = 'add_user_message'
};

export interface ChatAction {
  type: ChatActionTypes
  payload: string
};

export interface ChatDisplayProps {
  chatLog: JSX.Element[]
};

export interface ChatState {
  chatLog: JSX.Element[]
};

export interface ChatContextInterface {
  state: ChatState
  handleChatInputEntered: (ingredient: string) => void
};

export interface ChatInputProps {
  chatLog: string[]
  handleChatInputEntered: (ingredientInput: string) => void
};
