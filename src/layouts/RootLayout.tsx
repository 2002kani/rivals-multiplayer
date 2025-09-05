import { Outlet, useNavigate } from "react-router";
import { useLocation } from "react-router";

import { BackBtn } from "@/components/Buttons";
import Dots from "@/components/Dots";
import { Toaster } from "sonner";

function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {location.pathname !== "/" && (
        <div className="absolute top-4 left-4 z-20">
          <BackBtn onClick={() => navigate(-1)} />
        </div>
      )}
      <div className="absolute inset-0">
        {location.pathname == "/" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

        {location.pathname == "/" && <Dots />}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(0,0,0,0.01)_100%)] bg-[length:100%_6px] pointer-events-none"></div>

      <div className="relative z-10">
        <Outlet />
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default RootLayout;
