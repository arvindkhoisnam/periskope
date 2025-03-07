/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type currentUserType = {
  currentUser: string;
  setCurrentUser: (username: string) => void;
};
type recipientUserType = {
  recipientUser: string;
  setRecipientUser: (username: string) => void;
};
type displayType = {
  display: boolean;
  chatId: string;
  setDisplay: () => void;
  setChatId: (id: string) => void;
};
type modalType = {
  modalOpen: boolean;
  setModalOpen: () => void;
};

const useCurrentUser = create<currentUserType>((set) => ({
  currentUser: "",
  setCurrentUser: (username: string) => {
    set({ currentUser: username });
  },
}));
const useRecipientUser = create<recipientUserType>((set) => ({
  recipientUser: "",
  setRecipientUser: (username: string) => {
    set({ recipientUser: username });
  },
}));
const useDisplayChat = create<displayType>((set) => ({
  display: false,
  chatId: "",
  setDisplay: () => {
    set({ display: true });
  },
  setChatId: (chatId: string) => {
    set({ chatId });
  },
}));

const useModalOpen = create<modalType>((set) => ({
  modalOpen: false,
  setModalOpen: () => {
    set((state) => ({ modalOpen: !state.modalOpen })); // ✅ Corrected
  },
}));

type messagesType = {
  messages: any[];
  setMessages: (arr: string[]) => void;
};
const useMessages = create<messagesType>((set) => ({
  messages: [],
  setMessages: (arr: any[]) => {
    set({ messages: arr });
  },
}));

export {
  useCurrentUser,
  useDisplayChat,
  useModalOpen,
  useRecipientUser,
  useMessages,
};
