import { useMutation } from "@tanstack/react-query";
import {
  useCurrentUser,
  useDisplayChat,
  useMessages,
  useRecipientUser,
} from "../store";
import { ChatType } from "./AllChats";
import { getChatId, getMessages } from "../actions";

function Chat({
  c,
  notify,
  notifyId,
}: {
  c: ChatType;
  notify: boolean;
  notifyId: string;
}) {
  const currentUser = useCurrentUser((state) => state.currentUser);
  const setMessages = useMessages((state) => state.setMessages);
  const setDisplayChat = useDisplayChat((state) => state.setDisplay);
  const setChatId = useDisplayChat((state) => state.setChatId);
  const setRecipientUser = useRecipientUser((state) => state.setRecipientUser);
  function dateFormatter(input: string) {
    const date = new Date(input);
    const dateArr = date.toString().split(" ");
    const formattedDate = `${dateArr[2]}-${dateArr[1]}-${
      dateArr[3].split("")[2]
    }${dateArr[3].split("")[3]}`;
    return formattedDate;
  }
  const recipient = c.user1 === currentUser ? c.user2 : c.user1;
  const { mutate } = useMutation({
    mutationKey: ["messages"],
    mutationFn: async (recipientUser: string) => {
      const { chatId } = await getChatId(currentUser, recipientUser);
      if (chatId) {
        return getMessages(chatId[0].id);
      }
    },
    onSuccess: (data) => {
      if (data) {
        setMessages(data.data!);
      }
    },
  });
  return (
    <div
      className={`px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-neutral-200 
         ${notify && c.id === notifyId ? "bg-green-200" : ""}`}
      onClick={() => {
        setChatId(c.id);
        mutate(recipient);
        setRecipientUser(recipient);
        setDisplayChat();
      }}
    >
      <span className="h-9 w-10 rounded-full bg-neutral-400 flex justify-center items-center">
        {recipient?.split("")[0]}
      </span>
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col p-1 gap-1">
          <span className="text-baase font-bold text-neutral-800">
            {recipient}
          </span>
          <span className="text-sm font-medium text-neutral-500">
            {c.lastMessage.sender !== currentUser
              ? `${c.lastMessage.sender} : `
              : ""}
            {c.lastMessage.body}
          </span>
          <span className="py-1 px-2 bg-neutral-200 rounded w-fit text-xs text-neutral-400">
            +91 {c.contactNumber}
          </span>
        </div>
        <div className="text-neutral-400 text-xs">
          {dateFormatter(c.lastMessage.created_at)}
        </div>
      </div>
    </div>
  );
}

export default Chat;
