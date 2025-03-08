import { BsStars } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
function MainChatHeader({ recepient }: { recepient?: string }) {
  return (
    <div>
      <div className="border border-neutral-200 p-2 flex justify-between">
        <div className="flex items-center gap-3">
          <span className="size-10 rounded-full bg-neutral-300 flex justify-center items-center"></span>
          <div className="flex flex-col ">
            <span className="text-sm text-neutral-800 font font-bold">
              {recepient}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex">
            <span className="size-10 rounded-full bg-neutral-500 flex justify-center items-center -mr-2 z-50"></span>
            <span className="size-10 rounded-full bg-neutral-600 flex justify-center items-center -mr-2 z-40"></span>
            <span className="size-10 rounded-full bg-neutral-700 flex justify-center items-center -mr-2 z-30"></span>
            <span className="size-10 rounded-full bg-neutral-800 flex justify-center items-center -mr-2 z-20"></span>
            <span className="size-10 rounded-full bg-neutral-900 flex justify-center items-center -mr-2 z-10"></span>
            <span className="size-10 rounded-full bg-neutral-300 flex justify-center items-center">
              +3
            </span>
          </div>
          <BsStars fontSize="20px" color="#000" />
          <IoSearch fontSize="20px" color="#000" />
        </div>
      </div>
    </div>
  );
}

export default MainChatHeader;
