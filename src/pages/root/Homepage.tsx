import { useNavigate } from "react-router";

import { MainBtnLight, MainBtnDark } from "@/components/Buttons";
import { versionNumber } from "@/constants";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-16">
        <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-300 via-white-300 to-blue-300 bg-clip-text text-transparent  mb-4">
          RIVALS
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 font-light tracking-wide">
          Teste dein können gegen deine Freunde
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-100 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <MainBtnLight onClick={() => navigate("lobby")} />
        <MainBtnDark />
      </div>

      <div className="absolute bottom-8 right-8 text-gray-400 text-sm">
        {versionNumber}
      </div>
    </div>
  );
}

export default Homepage;
