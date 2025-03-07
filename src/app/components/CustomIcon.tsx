import { IconType } from "react-icons";

function CustomIcon({ Icon }: { Icon: IconType }) {
  return (
    <div className="group hover:bg-neutral-200 px-2 py-1 rounded-lg cursor-pointer">
      <Icon
        fontSize={20}
        className="text-neutral-500 group-hover:text-green-700"
      />
    </div>
  );
}

export default CustomIcon;
