import Card from "./Card";

interface IPlayerHandProps {
  playerHand: string[];
  playerValue: number;
  playerStand: boolean;
}

interface IEnemyHandProps {
  enemyHand: string[];
  enemyValue: number;
  enemyStand: boolean;
}

export function EnemyHand({
  enemyHand,
  enemyValue,
  enemyStand,
}: IEnemyHandProps) {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h2 className="text-white mb-3">
        Gegner Hand{" "}
        {enemyStand && <span className="text-indigo-300">(Fertig)</span>}
      </h2>
      <div className="flex gap-2 justify-center">
        {enemyHand.map((card, index) => (
          <Card key={index} rank={card} />
        ))}
      </div>
      <p className="text-white mt-3 bg-slate-500/20 px-3 py-1 rounded-md">
        Wert: {enemyValue}
      </p>
    </div>
  );
}

export function PlayerHand({
  playerHand,
  playerValue,
  playerStand,
}: IPlayerHandProps) {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h2 className="text-white mb-3">
        Spieler Hand{" "}
        {playerStand && <span className="text-indigo-300">(Fertig)</span>}
      </h2>
      <div className="flex gap-2 justify-center">
        {playerHand.map((card, index) => (
          <Card key={index} rank={card} />
        ))}
      </div>
      <p className="text-white mt-3 bg-slate-500/20 px-3 py-1 rounded-md">
        Wert: {playerValue}
      </p>
    </div>
  );
}
