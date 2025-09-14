import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";

interface ICustomToastProps {
  text: string;
  Icon: LucideIcon;
  duration?: number;
}

export function CustomToast({ text, Icon, duration }: ICustomToastProps) {
  toast.custom(
    () => (
      <div className="bg-slate-800/80 gap-2 flex items-center backdrop-blur-md rounded-lg py-3 px-8 border border-white/10 text-center">
        <Icon className="h-5 w-5" color="white" />
        <p className="text-white">{text}</p>
      </div>
    ),
    { duration: duration }
  );
}
