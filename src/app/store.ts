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

type compHeights = {
  ref1: number;
  ref2: number;
  ref3: number;
  setRefHeight1: (height: number) => void;
  setRefHeight2: (height: number) => void;
  setRefHeight3: (height: number) => void;
};

const useCompHeight = create<compHeights>((set) => ({
  ref1: 0,
  ref2: 0,
  ref3: 0,
  setRefHeight1: (height) => {
    set({ ref1: height });
  },
  setRefHeight2: (height) => {
    set({ ref2: height });
  },
  setRefHeight3: (height) => {
    set({ ref3: height });
  },
}));
export {
  useCurrentUser,
  useDisplayChat,
  useModalOpen,
  useRecipientUser,
  useMessages,
  useCompHeight,
};
