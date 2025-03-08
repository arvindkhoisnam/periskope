"use client";
import { RiFolderDownloadFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import SecondaryButton from "./SecondaryButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { allChats } from "../actions";
import Chat from "./Chat";
import { RiChatAiLine } from "react-icons/ri";
import { useCurrentUser, useModalOpen } from "../store";
import { useEffect, useState } from "react";
import { useSupabaseSubscription } from "../subscriptions";

export type ChatType = {
  id: string;
  created_at: string;
  contactNumber: string;
  user1: string;
  user2: string;
  lastMessage: {
    body: string;
    sender: string;
    created_at: string;
  };
};

function AllChats() {
  const setModalOpen = useModalOpen((state) => state.setModalOpen);
  const currentUser = useCurrentUser((state) => state.currentUser);
  const queryClient = useQueryClient();
  const [notify, setNotify] = useState(false);
  const [notifyId, setNotifyId] = useState("");

  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: () => allChats(currentUser),
  });

  async function handleInserts(payload: {
    new: { user1: string; user2: string; id: string };
  }) {
    if (
      payload.new.user1 === currentUser ||
      payload.new.user2 === currentUser
    ) {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      setNotify(true);
      setNotifyId(payload.new.id);
    }
  }
  useSupabaseSubscription("noti", "Chat", handleInserts);
  useEffect(() => {
    if (notify) {
      const timer = setTimeout(() => {
        setNotify(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notify]);

  return (
    <div className="col-span-5 border-r border-neutral-200 relative">
      <div className="bg-neutral-200 py-4 px-4 flex justify-between border border-neutral-200">
        <div className="flex items-center gap-2">
          <span className="text-xs text-green-600 font-bold flex items-center gap-1">
            <RiFolderDownloadFill fontSize="20px" />
            Custom filter
          </span>
          <SecondaryButton action="Save" />
        </div>
        <div className="flex gap-1">
          <SecondaryButton action="Search" Icon={FaSearch} />
          <SecondaryButton
            action="Filtered"
            Icon={IoFilterSharp}
            color="oklch(0.627 0.194 149.214)"
          />
        </div>
      </div>
      {data?.data?.map((c: ChatType) => (
        <Chat c={c} key={c.id} notify={notify} notifyId={notifyId} />
      ))}
      <button
        className="bg-green-700 p-2 rounded-full absolute bottom-6 right-4 cursor-pointer"
        onClick={() => setModalOpen()}
      >
        <RiChatAiLine fontSize={20} />
      </button>
    </div>
  );
}

export default AllChats;
