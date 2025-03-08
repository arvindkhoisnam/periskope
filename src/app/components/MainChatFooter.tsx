import { IoMdSend } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import { VscSmiley } from "react-icons/vsc";
import { IoMdTime } from "react-icons/io";
import { RxCountdownTimer } from "react-icons/rx";
import { BsStars } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import CustomIcon from "./CustomIcon";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../actions";
import {
  useCompHeight,
  useCurrentUser,
  useDisplayChat,
  useRecipientUser,
} from "../store";

function MainChatFooter() {
  const [messageody, setMessageBody] = useState("");
  const queryClient = useQueryClient();
  const recipientUser = useRecipientUser((state) => state.recipientUser);
  const currentUser = useCurrentUser((state) => state.currentUser);
  const setChatId = useDisplayChat((state) => state.setChatId);
  const setCompHeight = useCompHeight((state) => state.setRefHeight3);
  const ref3 = useRef<HTMLDivElement | null>(null);
  const { mutate } = useMutation({
    mutationFn: sendMessage,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    onSuccess: ({ newChat }) => {
      setChatId(newChat[0].id);

      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
  useEffect(() => {
    if (ref3.current) {
      setCompHeight(ref3.current.offsetHeight);
    }
  }, [setCompHeight]);
  return (
    <div className="bg-neutral-100 flex flex-col p-1" ref={ref3}>
      <div className="flex">
        <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              mutate({
                body: messageody,
                recipient: recipientUser,
                sender: currentUser,
              });
              setMessageBody("");
            }
          }}
          value={messageody}
          onChange={(e) => {
            setMessageBody(e.target.value);
          }}
          placeholder="Message..."
          className="w-full text-neutral-500 py-1 px-3 text-sm rounded-md
           focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
           selection:bg-green-200 selection:text-green-900"
        />
        <button
          className="py-1 px-3 cursor-pointer text-green-700 hover:text-green-600"
          onClick={() => {
            mutate({
              body: messageody,
              recipient: recipientUser,
              sender: currentUser,
            });
            setMessageBody("");
          }}
        >
          <IoMdSend fontSize={23} />
        </button>
      </div>
      <div className="flex py-1 px-4">
        <CustomIcon Icon={RiAttachment2} />
        <CustomIcon Icon={VscSmiley} />
        <CustomIcon Icon={IoMdTime} />
        <CustomIcon Icon={RxCountdownTimer} />
        <CustomIcon Icon={BsStars} />
        <CustomIcon Icon={FaFileAlt} />
        <CustomIcon Icon={FaMicrophone} />
      </div>
    </div>
  );
}

export default MainChatFooter;
