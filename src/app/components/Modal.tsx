"use client";
import { createPortal } from "react-dom";
import {
  useCurrentUser,
  useDisplayChat,
  useMessages,
  useModalOpen,
  useRecipientUser,
} from "../store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { allUsers, getChatId, getMessages } from "../actions";

function Modal() {
  const currentUser = useCurrentUser((state) => state.currentUser);
  const setRecipientUser = useRecipientUser((state) => state.setRecipientUser);
  const setMessages = useMessages((state) => state.setMessages);
  const modalOpen = useModalOpen((state) => state.modalOpen);
  const setModalOpen = useModalOpen((state) => state.setModalOpen);
  const setDisplayChat = useDisplayChat((state) => state.setDisplay);
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => allUsers(currentUser),
  });
  const { mutate } = useMutation({
    mutationKey: ["messages"],
    mutationFn: async (recipientUser: string) => {
      const { chatId } = await getChatId(currentUser, recipientUser);
      if (chatId) {
        return getMessages(chatId[0].id);
      }
    },
    onSettled: (data) => {
      if (data) {
        setMessages(data.data!);
      } else {
        setMessages([]);
      }
    },
  });

  if (!modalOpen) return null;

  const closeModal = () => {
    setModalOpen();
  };
  const parentElement = document.getElementById("parent");
  if (!parentElement) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        {data?.users?.map((user, index: number) => (
          <div
            onClick={() => {
              setRecipientUser(user.username);
              mutate(user.username);
              setDisplayChat();
              setModalOpen();
            }}
            key={index}
            className="text-green-600 font-bold hover:bg-neutral-100 py-2 px-4 rounded-lg cursor-pointer"
          >
            {user.username}
          </div>
        ))}
      </div>
    </div>,
    parentElement
  );
}

export default Modal;
