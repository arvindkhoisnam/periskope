import Image from "next/image";
import { IoMdHome } from "react-icons/io";
import { BsChatDotsFill } from "react-icons/bs";
import { BiSolidCoupon } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { FaListUl } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { TbChartDots3 } from "react-icons/tb";
import { FaRegAddressBook } from "react-icons/fa";
import { IoFolder } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import CustomIcon from "./CustomIcon";
import { TbStarsFilled } from "react-icons/tb";
import { RiLogoutBoxRFill } from "react-icons/ri";
function SideLeft() {
  return (
    <div className="col-span-1 border-r border-neutral-200 p-4 flex flex-col justify-between">
      <div>
        <div className="w-10 h-10 overflow-hidden rounded-lg">
          <div className="w-full h-full">
            <Image
              src="https://framerusercontent.com/images/ywGyuWgLKzqyB4QJ1sw5Nk1mckU.svg"
              alt="brand-logo"
              width={10}
              height={10}
              className="object-cover w-full h-full object-left"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-5 border-b border-neutral-300 pb-2">
          <CustomIcon Icon={IoMdHome} />
        </div>
        <div className="flex flex-col gap-2 items-center border-b border-neutral-300 pb-2 mt-3">
          <CustomIcon Icon={BsChatDotsFill} />
          <CustomIcon Icon={BiSolidCoupon} />
          <CustomIcon Icon={GoGraph} />
        </div>
        <div className="flex flex-col gap-2 items-center border-b border-neutral-300 pb-2 mt-3">
          <CustomIcon Icon={FaListUl} />
          <CustomIcon Icon={HiSpeakerphone} />
          <CustomIcon Icon={TbChartDots3} />
        </div>
        <div className="flex flex-col gap-2 items-center border-b border-neutral-300 pb-2 mt-3">
          <CustomIcon Icon={FaRegAddressBook} />
          <CustomIcon Icon={IoFolder} />
        </div>
        <div className="flex flex-col gap-2 items-center border-b border-neutral-300 pb-2 mt-3">
          <CustomIcon Icon={MdChecklist} />
          <CustomIcon Icon={IoMdSettings} />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center pb-2">
        <CustomIcon Icon={TbStarsFilled} />
        <CustomIcon Icon={RiLogoutBoxRFill} />
      </div>
    </div>
  );
}

export default SideLeft;
