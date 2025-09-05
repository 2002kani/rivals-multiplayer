import type { LucideIcon } from "lucide-react";
import { SendBtn } from "./Buttons";

interface ICardProps {
  text: string;
  Icon: LucideIcon;
  link?: string;
}

function Card({ text, Icon, link }: ICardProps) {
  return (
    <div className="flex">
      <div className="bg-slate-800/80 gap-2 flex items-center backdrop-blur-md rounded-l-xl p-4 border border-white/10 text-center">
        <Icon className="w-4 h-4 text-blue-400 mx-auto" />
        <p className="text-gray-400 text-md text-">
          {text}: <span className="text-white">{link}</span>
        </p>
      </div>
      <SendBtn />
    </div>
  );
}

export default Card;
