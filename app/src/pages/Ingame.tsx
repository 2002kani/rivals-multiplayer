import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { CustomBtnDark, CustomBtnLight } from "@/components/Buttons";
import { Check, CircleAlert, CirclePlus, Hand, Loader2, X } from "lucide-react";

import Rounds from "@/components/Rounds";
import { EnemyHand, PlayerHand } from "@/components/Hands";
import { toast } from "sonner";
import { CustomToast } from "@/components/customToasts";

function Ingame() {
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [enemyHand, setEnemyHand] = useState<string[]>([]);

  const [playerValue, setPlayerValue] = useState(0);
  const [enemyValue, setEnemyValue] = useState(0);

  const [playerStands, setPlayerStands] = useState(false);
  const [enemyStands, setEnemyStands] = useState(false);

  const [gameOver, setGameOver] = useState<boolean>(false);

  const [roundCounter, setRoundCounter] = useState(1);
  const [currentTurn, setCurrentTurn] = useState<"player" | "enemy">("player");

  const [myTurn, setMyTurn] = useState(false);
  const [, setRole] = useState<"player1" | "player2">();

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("role", (assignedRole: "player1" | "player2") => {
      setRole(assignedRole);
      console.log("My role: ", assignedRole);
    });

    socketRef.current.on("gameUpdate", (gameData) => {
      setPlayerHand(gameData.myHand);
      setPlayerValue(gameData.myHandValue);
      setEnemyHand(gameData.enemyHand);
      setEnemyValue(gameData.enemyHandValue);
      setEnemyStands(gameData.enemyStand);
      setCurrentTurn(gameData.currentTurn);

      setMyTurn(gameData.currentTurn === gameData.myRole);
    });

    socketRef.current.on("gameOver", (data) => {
      setGameOver(true);

      // TODO: unentschieden einbauen unter den Texten <p>...</p>
      toast.custom(
        () => (
          <div className="bg-slate-800/80 gap-2 flex items-center backdrop-blur-md rounded-lg py-3 px-8 border border-white/10 text-center">
            {data.youWon ? (
              <Check className="h-6 w-6" color="green" />
            ) : (
              <X className="h-6 w-6" color="red" />
            )}
            <p className="text-white">
              {data.youWon ? "Du gewinnst!" : "Du hast leider verloren!"}
            </p>
            <Loader2 className="animate-spin h-6 w-6 text-white" />
          </div>
        ),
        {
          duration: 2900,
        }
      );

      setTimeout(() => {
        setGameOver(false);
        setRoundCounter((prev) => prev + 1);
      }, 3000);
    });

    socketRef.current.on("gameFull", () => {
      CustomToast({
        text: "Spiel ist leider voll!",
        Icon: CircleAlert,
        duration: 3000,
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Erstmal lassen bis du stand logik implementierst (wegen sachen wie unentschieden etc..)

  /*
  useEffect(() => {
    if (playerValue === 5 && enemyValue === 5) {
      gameBeginningHands();
    }

    if (gameOver) {
      switch (true) {
        case playerValue === 16 && enemyValue !== 16:
          setResult({ type: "player", message: "Spieler hat genau 16!" });
          //setWinner("player");
          break;
        case enemyValue === 16 && playerValue !== 16:
          setResult({ type: "enemy", message: "Gegner hat genau 16!" });
          //setWinner("enemy");
          break;
        case playerValue > 16:
          setResult({
            type: "enemy",
            message: "Spieler verschätzt! Gegner gewinnt.",
          });
          //setWinner("enemy");
          break;
        case enemyValue > 16:
          setResult({
            type: "player",
            message: "Gegner verschätzt! Spieler gewinnt.",
          });
          //setWinner("player");
          break;
        case playerValue === enemyValue:
          setResult({ type: "draw", message: "Unentschieden!" });
          //setWinner("both");
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
  */

  const drawCard = () => {
    if (!myTurn || gameOver) return;

    socketRef.current?.emit("drawCard");
  };

  /*
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
  */

  return (
    <div className="flex flex-col items-center mt-20 gap-5 relative">
      <Rounds roundCounter={roundCounter} />

      <EnemyHand
        enemyStand={enemyStands}
        enemyHand={enemyHand}
        enemyValue={enemyValue}
      />

      <div className="flex gap-5 mb-10">
        <CustomBtnLight
          Icon={CirclePlus}
          onClick={drawCard}
          label="Karte ziehen"
          className="w-5 h-5"
          disabled={gameOver || !myTurn}
        />

        <CustomBtnDark
          Icon={Hand}
          onClick={() => undefined}
          label="Stand"
          className="w-5 h-5"
          disabled={gameOver || !myTurn}
        />
      </div>

      <PlayerHand
        playerStand={playerStands}
        playerHand={playerHand}
        playerValue={playerValue}
      />
    </div>
  );
}

export default Ingame;
