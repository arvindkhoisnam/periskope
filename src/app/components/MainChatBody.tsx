"use client";
import { useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../actions";
import { useCurrentUser, useDisplayChat, useMessages } from "../store";
import { useEffect, useRef } from "react";
import { useSupabaseSubscription } from "../subscriptions";

function MainChatBody() {
  const currentUser = useCurrentUser((state) => state.currentUser);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messages = useMessages((state) => state.messages);
  const setMessages = useMessages((state) => state.setMessages);
  const chatId = useDisplayChat((state) => state.chatId);
  const queryClient = useQueryClient();
  const handleInserts = async (payload: { new: { id: string } }) => {
    if (payload.new.id === chatId) {
      const msgs = await getMessages(chatId);
      setMessages(msgs.data!);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    }
  };
  useSupabaseSubscription("msgs", "Chat", handleInserts);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      ref={containerRef}
      className={`flex flex-col overflow-y-auto px-2 py-2 flex-1 min-h-0`}
      style={{
        backgroundImage:
          "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      {messages.map((msg) => (
        <div
          className={`text-sm py-1 px-2 ${
            msg.sender === currentUser
              ? "bg-green-200 self-end"
              : "bg-neutral-100"
          } w-fit rounded-lg mt-3 flex flex-col gap-1 min-w-44`}
          key={msg.id}
        >
          <span className="text-green-700 font-bold">{msg.sender}</span>
          <p className="text-neutral-800 ">{msg.body}</p>
          <div className="flex justify-end">
            <span className="text-neutral-500">
              {new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainChatBody;
