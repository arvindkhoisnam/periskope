import { BsChatDotsFill } from "react-icons/bs";
import { LuRefreshCcwDot } from "react-icons/lu";
import { MdHelpOutline } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { GoDesktopDownload } from "react-icons/go";
import { FaBellSlash } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import NavButtons from "./NavButtons";
import { useCompHeight } from "../store";
import { useEffect, useRef } from "react";
function Nav() {
  const setCompHeight = useCompHeight((state) => state.setRefHeight1);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      setCompHeight(ref.current.offsetHeight);
    }
  }, [setCompHeight]);
  return (
    <nav
      className="row-span-1 border-b border-neutral-200 flex justify-between items-center px-4"
      ref={ref}
    >
      <div className="flex items-center gap-3">
        <BsChatDotsFill color="#999" fontSize="20px" />
        <span className="text-neutral-500 font-semibold">chats</span>
      </div>
      <div className="flex gap-3">
        <NavButtons action="Refresh" Icon={LuRefreshCcwDot} />
        <NavButtons action="Help" Icon={MdHelpOutline} />
        <NavButtons action="5 / 6 phones" Icon={GoDotFill} color="orange" />
        <NavButtons Icon={GoDesktopDownload} />
        <NavButtons Icon={FaBellSlash} />
        <NavButtons
          SecondaryIcon={BsStars}
          secondaryColor="orange"
          Icon={FaListUl}
        />
      </div>
    </nav>
  );
}

export default Nav;
