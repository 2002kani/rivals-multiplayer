import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { CustomBtnDark, CustomBtnLight } from "@/components/Buttons";
import { Check, CirclePlus, Hand, Loader2, X } from "lucide-react";

import Rounds from "@/components/Rounds";
import { EnemyHand, PlayerHand } from "@/components/Hands";
import { toast } from "sonner";

function Ingame() {
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [enemyHand, setEnemyHand] = useState<string[]>([]);

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [, setWinner] = useState<"player" | "enemy" | "both" | null>(null);

  const [roundCounter, setRoundCounter] = useState(1);
  const [, setCurrentTurn] = useState<"player1" | "player2">("player1");
  const [myTurn, setMyTurn] = useState(false);

  const [role, setRole] = useState<"player1" | "player2" | null>(null);

  const [playerValue, setPlayerValue] = useState(0);
  const [enemyValue, setEnemyValue] = useState(0);
  const [, setPlayerStands] = useState(false);
  const [, setEnemyStands] = useState(false);

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
      setPlayerStands(gameData.myStand);
      setEnemyHand(gameData.enemyHand);
      setEnemyValue(gameData.enemyHandValue);
      setEnemyStands(gameData.enemyStand);
      setCurrentTurn(gameData.currentTurn);

      // Prüfen ob ich dran bin
      setMyTurn(gameData.currentTurn === gameData.myRole && !gameData.myStand);

      console.log("Game update:", gameData);
    });

    // Game Over vom Server
    socketRef.current.on("gameOver", (data) => {
      console.log("Game over:", data);
      setGameOver(true);

      // Winner bestimmen basierend auf meiner Rolle
      let displayWinner: "player" | "enemy" | "both";
      if (data.winner === role) {
        displayWinner = "player";
      } else {
        displayWinner = "enemy";
      }

      setWinner(displayWinner);

      // Toast anzeigen
      toast.custom(
        () => (
          <div className="bg-slate-800/80 gap-2 flex items-center backdrop-blur-md rounded-lg py-3 px-8 border border-white/10 text-center">
            {displayWinner === "player" ? (
              <Check className="h-6 w-6" color="green" />
            ) : (
              <X className="h-6 w-6" color="red" />
            )}
            <p className="text-white">
              {displayWinner === "both"
                ? "Unentschieden!"
                : `${
                    displayWinner === "player"
                      ? "Du gewinnst!"
                      : "Du verlierst!"
                  }`}
            </p>
            <Loader2 className="animate-spin h-6 w-6 text-white" />
          </div>
        ),
        {
          duration: 2900,
        }
      );

      // Nach 3 Sekunden neues Spiel
      setTimeout(() => {
        setGameOver(false);
        setWinner(null);
        setRoundCounter((prev) => prev + 1);
      }, 3000);
    });

    // Fehler vom Server
    socketRef.current.on("error", (message) => {
      console.error("Server error:", message);
      toast.error(message);
    });

    // Spieler disconnected
    socketRef.current.on("playerDisconnected", () => {
      toast.error("Der andere Spieler hat das Spiel verlassen");
      setGameOver(true);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [role]);

  const drawCard = () => {
    if (!myTurn || gameOver) return;

    console.log("Drawing card...");
    socketRef.current?.emit("drawCard");
  };

  const handleStand = () => {
    if (!myTurn || gameOver) return;

    console.log("Standing...");
    socketRef.current?.emit("stand");
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-5 relative">
      <Rounds roundCounter={roundCounter} />

      <EnemyHand
        enemyStand={false}
        enemyHand={enemyHand}
        enemyValue={enemyValue}
      />

      <div className="flex gap-5 mb-10">
        <CustomBtnLight
          Icon={CirclePlus}
          onClick={drawCard}
          label="Karte ziehen"
          className="w-5 h-5"
          disabled={!myTurn || gameOver}
        />

        <CustomBtnDark
          Icon={Hand}
          onClick={handleStand}
          label="Stand"
          className="w-5 h-5"
          disabled={!myTurn || gameOver}
        />
      </div>

      <PlayerHand
        playerStand={false}
        playerHand={playerHand}
        playerValue={playerValue}
      />
    </div>
  );
}

export default Ingame;
