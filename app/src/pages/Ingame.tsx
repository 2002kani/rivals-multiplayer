import { useEffect, useState } from "react";

import { cards } from "@/constants";
import { CustomBtnDark } from "@/components/Buttons";
import { Plus, X } from "lucide-react";
import { calculateHandValue } from "@/lib/utils";

function Ingame() {
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [enemyHand, setEnemyHand] = useState<string[]>([]);

  const [playerValue, setPlayerValue] = useState(0);
  const [enemyValue, setEnemyValue] = useState(0);

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [result, setResult] = useState({ type: "", message: "" });

  const [roundCounter, setRoundCounter] = useState(1);

  useEffect(() => {
    if (playerValue === 0 && enemyValue === 0) {
      gameBeginningHands();
    }

    if (gameOver) {
      switch (true) {
        case playerValue === 16 && enemyValue !== 16:
          setResult({ type: "player", message: "Spieler hat genau 16!" });
          break;
        case enemyValue === 16 && playerValue !== 16:
          setResult({ type: "enemy", message: "Gegner hat genau 16!" });
          break;
        case playerValue > 16:
          setResult({
            type: "enemy",
            message: "Spieler verschätzt! Gegner gewinnt.",
          });
          break;
        case enemyValue > 16:
          setResult({
            type: "player",
            message: "Gegner verschätzt! Spieler gewinnt.",
          });
          break;
        case playerValue === enemyValue:
          setResult({ type: "draw", message: "Unentschieden!" });
          break;
        case Math.abs(16 - playerValue) < Math.abs(16 - enemyValue):
          setResult({ type: "player", message: "Spieler ist näher an 16!" });
          break;
        case Math.abs(16 - enemyValue) < Math.abs(16 - playerValue):
          setResult({ type: "enemy", message: "Gegner ist näher an 16!" });
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
      handleGameOver({
        type: "player",
        message: "Schade, du hast dich leider verschätzt.",
      });
    }
  };

  const cardToEnemy = () => {
    const newHand = [...enemyHand, getRandomCard()];
    setEnemyHand(newHand);

    const newEnemyValue = calculateHandValue(newHand);
    setEnemyValue(newEnemyValue);

    console.log("Enemy value: ", newEnemyValue);

    if (newEnemyValue > 16) {
      handleGameOver({
        type: "enemy",
        message: "Schade, du hast dich leider verschätzt.",
      });
    }
  };

  const handleGameOver = (result: { type: string; message: string }) => {
    setGameOver(true);
    setResult(result);
  };

  const resetGame = () => {
    setPlayerHand([]);
    setPlayerValue(0);
    setEnemyHand([]);
    setEnemyValue(0);
    setGameOver(false);
    setResult({ type: "", message: "" });

    setRoundCounter((prev) => prev + 1);
  };

  const revealHands = () => {
    if (roundCounter == 5) {
      console.log("Alle runden gespielt, fertig!");
    } else {
      setTimeout(() => resetGame(), 1000);
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
    <div className="flex flex-col items-center mt-10 gap-5">
      {/* Buttons */}
      <div className="flex gap-5">
        <CustomBtnDark Icon={Plus} onClick={cardToPlayer} label="Spieler" />
        <CustomBtnDark Icon={X} onClick={resetGame} label="Reset" />
        <CustomBtnDark Icon={Plus} onClick={cardToEnemy} label="Gegner" />
      </div>

      {/* Spieler Hand */}
      <div>
        <h2 className="text-white">Spieler Hand: {playerHand.join(", ")}</h2>
        <p className="text-white">Wert: {playerValue}</p>
      </div>

      {/* Gegner Hand */}
      <div>
        <h2 className="text-white">Gegner Hand: {enemyHand.join(", ")}</h2>
        <p className="text-white">Wert: {enemyValue}</p>
      </div>

      {/* Runde */}
      <div>
        <p className="text-white">Runde: {roundCounter} / 5</p>
      </div>

      {/* Ergebnis */}
      {gameOver && (
        <div>
          <p className="text-white">{result.message}</p>
        </div>
      )}
    </div>
  );
}

export default Ingame;
