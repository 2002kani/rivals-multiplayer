import { Wrench } from "lucide-react";

function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl px-8">
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-slate-700/80 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-full p-8 border border-slate-600/50">
              <Wrench className="w-20 h-20 text-slate-400 mx-auto animate-bounce" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          In Entwicklung..
        </h1>

        <p className="text-xl text-white/70 font-light leading-relaxed">
          Diese Seite steht derzeit nicht zur Verfügung.
          <br />
          Wir arbeiten daran, sie bald für dich verfügbar zu machen.
        </p>
      </div>
    </div>
  );
}

export default UnderConstruction;
