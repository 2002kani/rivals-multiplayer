import { useEffect, useState } from "react";

import { cards } from "@/constants";
import { CustomBtnDark, CustomBtnLight } from "@/components/Buttons";
import { Check, CirclePlus, Hand, Loader2, X } from "lucide-react";
import { calculateHandValue } from "@/lib/utils";

import Rounds from "@/components/Rounds";
import { EnemyHand, PlayerHand } from "@/components/Hands";
import { toast } from "sonner";

function Ingame() {
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [enemyHand, setEnemyHand] = useState<string[]>([]);

  const [playerValue, setPlayerValue] = useState(0);
  const [enemyValue, setEnemyValue] = useState(0);

  const [playerStands, setPlayerStands] = useState(false);
  const [enemyStands, setEnemyStands] = useState(false);

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [, setResult] = useState({ type: "", message: "" });
  const [, setWinner] = useState<"player" | "enemy" | "both" | null>(null);

  const [roundCounter, setRoundCounter] = useState(1);
  const [currentTurn, setCurrentTurn] = useState<"player" | "enemy">("player");

  useEffect(() => {
    if (playerValue === 0 && enemyValue === 0) {
      gameBeginningHands();
    }

    if (gameOver) {
      switch (true) {
        case playerValue === 16 && enemyValue !== 16:
          setResult({ type: "player", message: "Spieler hat genau 16!" });
          setWinner("player");
          break;
        case enemyValue === 16 && playerValue !== 16:
          setResult({ type: "enemy", message: "Gegner hat genau 16!" });
          setWinner("enemy");
          break;
        case playerValue > 16:
          setResult({
            type: "enemy",
            message: "Spieler verschätzt! Gegner gewinnt.",
          });
          setWinner("enemy");
          break;
        case enemyValue > 16:
          setResult({
            type: "player",
            message: "Gegner verschätzt! Spieler gewinnt.",
          });
          setWinner("player");
          break;
        case playerValue === enemyValue:
          setResult({ type: "draw", message: "Unentschieden!" });
          setWinner("both");
          break;
        case Math.abs(16 - playerValue) < Math.abs(16 - enemyValue):
          setResult({ type: "player", message: "Spieler ist näher an 16!" });
          setWinner("player");
          break;
        case Math.abs(16 - enemyValue) < Math.abs(16 - playerValue):
          setResult({ type: "enemy", message: "Gegner ist näher an 16!" });
          setWinner("enemy");
          break;
        default:
          break;
      }
    }
  }, [playerHand, enemyHand, gameOver]);

  const getRandomCard = () => {
    const randomNumber = Math.floor(Math.random() * cards.length);
    const randomCard = cards[randomNumber];

    console.log("Random card: ", randomCard);
    return randomCard;
  };

  const cardToPlayer = () => {
    const newHand = [...playerHand, getRandomCard()];
    setPlayerHand(newHand);

    const newPlayerValue = calculateHandValue(newHand);
    setPlayerValue(newPlayerValue);

    console.log("Player value: ", newPlayerValue);

    if (newPlayerValue > 16) {
      handleGameOver(
        {
          type: "player",
          message: "Schade, du hast dich leider verschätzt.",
        },
        "enemy"
      );
      setWinner("enemy");
      setTimeout(() => resetGame(), 3000);
    } else {
      if (!enemyStands) {
        setCurrentTurn("enemy");
      }
    }
  };

  const cardToEnemy = () => {
    const newHand = [...enemyHand, getRandomCard()];
    setEnemyHand(newHand);

    const newEnemyValue = calculateHandValue(newHand);
    setEnemyValue(newEnemyValue);

    console.log("Enemy value: ", newEnemyValue);

    if (newEnemyValue > 16) {
      handleGameOver(
        {
          type: "enemy",
          message: "Schade, du hast dich leider verschätzt.",
        },
        "player"
      );
      setWinner("player");
      setTimeout(() => resetGame(), 3000);
    } else {
      if (!playerStands) {
        setCurrentTurn("player");
      }
    }
  };

  const handleGameOver = (
    result: { type: string; message: string },
    winner: "player" | "enemy" | "both"
  ) => {
    setGameOver(true);
    setResult(result);
    setWinner(winner);

    toast.custom(
      () => (
        <div className="bg-slate-800/80 gap-2 flex items-center backdrop-blur-md rounded-lg py-3 px-8 border border-white/10 text-center">
          {winner === "player" ? (
            <Check className="h-6 w-6" color="green" />
          ) : (
            <X className="h-6 w-6" color="red" />
          )}
          <p className="text-white">
            {winner === "both" ? "Unentschieden!" : `${winner} gewinnt!`}
          </p>
          <Loader2 className="animate-spin h-6 w-6 text-white" />
        </div>
      ),
      {
        duration: 2900,
      }
    );
  };

  const resetGame = () => {
    setPlayerHand([]);
    setPlayerValue(0);
    setEnemyHand([]);
    setEnemyValue(0);
    setWinner(null);
    setGameOver(false);
    setEnemyStands(false);
    setPlayerStands(false);
    setResult({ type: "", message: "" });

    setRoundCounter((prev) => prev + 1);
  };

  const handleStand = (current: "player" | "enemy") => {
    let newPlayerStands = playerStands;
    let newEnemyStands = enemyStands;

    if (current === "player") {
      newPlayerStands = true;
      setPlayerStands(true);
    } else {
      newEnemyStands = true;
      setEnemyStands(true);
    }

    if (newPlayerStands && newEnemyStands) {
      let winner: "player" | "enemy" | "both";
      let message: string;

      if (playerValue === enemyValue) {
        winner = "both";
        message = "Unentschieden!";
      } else if (Math.abs(16 - playerValue) < Math.abs(16 - enemyValue)) {
        winner = "player";
        message = "Spieler ist näher an 16!";
      } else {
        winner = "enemy";
        message = "Gegner ist näher an 16!";
      }

      handleGameOver({ type: winner, message }, winner);
      setTimeout(() => resetGame(), 3000);
    } else {
      if (current === "player" && !newEnemyStands) {
        setCurrentTurn("enemy");
      } else if (current === "enemy" && !newPlayerStands) {
        setCurrentTurn("player");
      }
    }
  };

  const gameBeginningHands = () => {
    const playerBeginningHands = [getRandomCard()];
    setPlayerHand(playerBeginningHands);
    setPlayerValue(calculateHandValue(playerBeginningHands));

    const enemyBeginningHands = [getRandomCard()];
    setEnemyHand(enemyBeginningHands);
    setEnemyValue(calculateHandValue(enemyBeginningHands));
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-5 relative">
      <Rounds roundCounter={roundCounter} />

      <EnemyHand enemyHand={enemyHand} enemyValue={enemyValue} />

      <div className="flex gap-5 mb-10">
        {currentTurn === "player" && (
          <CustomBtnLight
            Icon={CirclePlus}
            onClick={cardToPlayer}
            label="Karte ziehen"
            className="w-5 h-5"
            disabled={gameOver}
          />
        )}
        {currentTurn === "enemy" && (
          <CustomBtnLight
            Icon={CirclePlus}
            onClick={cardToEnemy}
            label="Karte ziehen"
            className="w-5 h-5"
            disabled={gameOver}
          />
        )}
        <CustomBtnDark
          Icon={Hand}
          onClick={() => handleStand(currentTurn)}
          label="Stand"
          className="w-5 h-5"
          disabled={gameOver}
        />
      </div>

      <PlayerHand playerHand={playerHand} playerValue={playerValue} />
    </div>
  );
}

export default Ingame;
