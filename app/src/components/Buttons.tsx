import {
  Play,
  Settings,
  ArrowBigLeft,
  Copy,
  Check,
  Pause,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

interface IButtonProps {
  onClick: () => void;
}

interface ICustomProps {
  onClick: () => void;
  label?: string;
  className?: string;
  Icon: LucideIcon;
  disabled?: boolean;
}

export function MainBtnLight({ onClick }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer group relative px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-300 hover:from-blue-500 hover:to-blue-300 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 min-w-[200px]"
    >
      <div className="flex items-center justify-center gap-3">
        <Play className="w-6 h-6 group-hover:animate-pulse" />
        <span>Spiel Starten</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
    </button>
  );
}

export function MainBtnDark({ onClick }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer group relative px-12 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-lg rounded-xl border border-slate-600 hover:border-slate-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/30 backdrop-blur-sm min-w-[200px]"
    >
      <div className="flex items-center justify-center gap-3">
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        <span>Einstellungen</span>
      </div>
    </button>
  );
}

export function CustomBtnDark({
  onClick,
  label,
  className,
  Icon,
  disabled,
}: ICustomProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`group relative px-8 py-2 bg-slate-800/80 text-white font-semibold text-md rounded-xl border border-slate-600 backdrop-blur-sm min-w-[200px] transition-all duration-300 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:bg-slate-700/80 hover:border-slate-400 transform hover:scale-102 hover:shadow-2xl hover:shadow-slate-500/30"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <Icon className={className} />
        <span>{label}</span>
      </div>
    </button>
  );
}

export function CustomBtnLight({
  onClick,
  label,
  className,
  Icon,
  disabled,
}: ICustomProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`group relative px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold text-md rounded-xl min-w-[200px] transition-all duration-300 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:from-blue-500 hover:to-blue-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <Icon className={className} />
        <span>{label}</span>
      </div>
    </button>
  );
}

export function BackBtn({ onClick }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer group relative p-4 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-lg rounded-lg border border-slate-600 hover:border-slate-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/30 backdrop-blur-sm"
    >
      <div className="flex items-center justify-center gap-3">
        <ArrowBigLeft className="w-5 h-5" />
      </div>
    </button>
  );
}

export function SendBtn({ onClick }: IButtonProps) {
  const [checked, setChecked] = useState(false);
  return (
    <button
      onClick={() => {
        setChecked(true);
        onClick();
      }}
      className="cursor-pointer group relative px-6 bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-500 hover:to-blue-300 text-white font-semibold text-lg rounded-r-xl transition-all duration-300  hover:shadow-2xl hover:shadow-slate-500/30 backdrop-blur-sm"
    >
      <div className="flex items-center justify-center gap-3">
        <span
          className={`transition-all duration-200 transform ${
            checked
              ? "scale-0 opacity-0 rotate-90"
              : "scale-100 opacity-100 rotate-0"
          }`}
        >
          <Copy className="w-5 h-5" />
        </span>

        <span
          className={`absolute transition-all duration-200 transform ${
            checked
              ? "scale-100 opacity-100 rotate-0"
              : "scale-0 opacity-0 -rotate-90"
          }`}
        >
          <Check className="w-6 h-6" />
        </span>
      </div>
    </button>
  );
}

export function PauseBtn({ onClick }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer group relative p-4 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-lg rounded-lg border border-slate-600 hover:border-slate-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/30 backdrop-blur-sm"
    >
      <div className="flex items-center justify-center gap-3">
        <Pause className="w-5 h-5" />
      </div>
    </button>
  );
}
