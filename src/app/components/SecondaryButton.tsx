import { IconType } from "react-icons";
function SecondaryButton({
  action,
  color,
  secondaryColor,
  Icon,
  SecondaryIcon,
}: {
  action?: string;
  color?: string;
  secondaryColor?: string;
  Icon?: IconType;
  SecondaryIcon?: IconType;
}) {
  return (
    <button className="bg-neutral-100 text-neutral-700 text-xs py-1 px-2 rounded shadow-sm shadow-neutral-400 flex items-center gap-2">
      {SecondaryIcon && <SecondaryIcon color={secondaryColor} />}
      {Icon && <Icon fontSize="15px" color={color} />}
      {action}
    </button>
  );
}

export default SecondaryButton;
