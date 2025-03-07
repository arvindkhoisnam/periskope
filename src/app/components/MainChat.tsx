import { useRecipientUser } from "../store";
import MainChatBody from "./MainChatBody";
import MainChatFooter from "./MainChatFooter";
import MainChatHeader from "./MainChatHeader";

function MainChat() {
  const recipientUser = useRecipientUser((state) => state.recipientUser);
  return (
    <div className="col-span-14 bg-neutral-200 border-r border-neutral-200 flex flex-col h-full">
      <MainChatHeader recepient={recipientUser} />
      <MainChatBody />
      <MainChatFooter />
    </div>
  );
}

export default MainChat;
