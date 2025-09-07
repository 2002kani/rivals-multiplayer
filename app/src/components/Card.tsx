interface ICardProps {
  rank: string | number;
}

function Card({ rank }: ICardProps) {
  return (
    <div
      className="w-25 h-34 bg-white rounded-lg border-2 border-gray-300 shadow-lg flex items-center justify-center font-bold text-2xl text-gray-800 transform transition-all ease-out hover:translate-y-[-5px] hover:shadow-xl"
      style={{
        transform: `translateY(${0 * -8}px)`,
        zIndex: 5,
      }}
    >
      <div className="w-23 h-32 border-1 border-slate-300 rounded-lg flex justify-center items-center">
        <p className="text-5xl">{rank}</p>
      </div>
    </div>
  );
}

export default Card;
