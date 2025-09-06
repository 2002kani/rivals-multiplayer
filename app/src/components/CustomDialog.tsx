import { useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomBtnDark } from "./Buttons";
import { Play, Undo2 } from "lucide-react";

interface ICustomDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomDialog({ open, setOpen }: ICustomDialogProps) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-2xl text-white shadow-2xl shadow-slate-500/30 transition-all duration-300">
        <DialogTitle className="text-xl flex justify-center text-center">
          Was möchtest du tun?
        </DialogTitle>
        <DialogDescription className="flex flex-col gap-3 justify-center mt-6 px-15">
          <CustomBtnDark
            label={"Weiterspielen"}
            className={"w-4 h-4 "}
            Icon={Play}
            onClick={() => setOpen(false)}
          />
          <CustomBtnDark
            label={"Zurück zum Hauptmenu"}
            className={"w-4 h-4"}
            Icon={Undo2}
            onClick={() => navigate("/")}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
