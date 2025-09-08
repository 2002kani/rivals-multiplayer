interface IRoundsProps {
  roundCounter: number;
}

function Rounds({ roundCounter }: IRoundsProps) {
  return (
    <div className="fixed bottom-5 right-5 px-8 py-2 bg-slate-800/80 hover:bg-slate-700/80 transition text-white font-semibold text-md rounded-xl border border-slate-600 hover:border-slate-400">
      <div className="flex items-center justify-center gap-3">
        <span>Runde: {roundCounter} / 5</span>
      </div>
    </div>
  );
}

export default Rounds;
