import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { CustomBtnDark, CustomBtnLight } from "@/components/Buttons";
import {
  Check,
  CircleAlert,
  CirclePlus,
  Hand,
  Loader2,
  X,
  Meh,
} from "lucide-react";

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

      if (gameData.myRole === "player1") {
        setPlayerStands(gameData.stands.player1);
        setEnemyStands(gameData.stands.player2);
      } else {
        setPlayerStands(gameData.stands.player2);
        setEnemyStands(gameData.stands.player1);
      }

      setMyTurn(gameData.currentTurn === gameData.myRole);
    });

    socketRef.current.on("gameOver", (data) => {
      setGameOver(true);

      toast.custom(
        () => (
          <div className="bg-slate-800/80 gap-2 flex items-center backdrop-blur-md rounded-lg py-3 px-8 border border-white/10 text-center">
            {data.draw ? (
              <Meh className="h-5 w-5" color="white" />
            ) : data.youWon ? (
              <Check className="h-6 w-6" color="green" />
            ) : (
              <X className="h-6 w-6" color="red" />
            )}
            <p className="text-white">
              {data.draw
                ? "Unentschieden!"
                : data.youWon
                ? "Du gewinnst!"
                : "Du hast leider verloren!"}
            </p>
            <Loader2 className="animate-spin h-6 w-6 text-white" />
          </div>
        ),
        {
          duration: 4900,
        }
      );

      setTimeout(() => {
        setGameOver(false);
        setRoundCounter((prev) => prev + 1);
      }, 5000);
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

  const drawCard = () => {
    if (!myTurn || gameOver) return;

    socketRef.current?.emit("drawCard");
  };

  const handleStand = () => {
    socketRef.current?.emit("handleStand");
  };

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
          disabled={gameOver || !myTurn || playerStands}
        />

        <CustomBtnDark
          Icon={Hand}
          onClick={handleStand}
          label="Stand"
          className="w-5 h-5"
          disabled={gameOver || !myTurn || playerStands}
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
