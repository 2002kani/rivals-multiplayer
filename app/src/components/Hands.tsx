import Card from "./Card";

interface IPlayerHandProps {
  playerHand: string[];
  playerValue: number;
}

interface IEnemyHandProps {
  enemyHand: string[];
  enemyValue: number;
}

export function EnemyHand({ enemyHand, enemyValue }: IEnemyHandProps) {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h2 className="text-white mb-3">Gegner Hand</h2>
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

export function PlayerHand({ playerHand, playerValue }: IPlayerHandProps) {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h2 className="text-white mb-3">Spieler Hand</h2>
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
