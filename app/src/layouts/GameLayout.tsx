import { Outlet } from "react-router";
import { useState } from "react";

import CustomDialog from "@/components/CustomDialog";
import { PauseBtn } from "@/components/Buttons";
import { Toaster } from "@/components/ui/sonner";

function GameLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <div className="absolute top-4 left-4 z-20">
        <PauseBtn onClick={() => setOpen(true)} />
      </div>

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(0,0,0,0.01)_100%)] bg-[length:100%_6px] pointer-events-none"></div>

      <div className="relative z-10">
        <Outlet />
      </div>

      <CustomDialog open={open} setOpen={setOpen} />

      <Toaster position="top-right" />
    </div>
  );
}

export default GameLayout;
