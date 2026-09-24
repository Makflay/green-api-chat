export type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export type MessageDirection = "incoming" | "outgoing";

export type Message = {
  id: string;
  text: string;
  direction: MessageDirection;
};

export type Chat = {
  id: string;
  phone: string;
  messages: Message[];
};
