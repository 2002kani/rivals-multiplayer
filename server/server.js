import { Server } from "socket.io";

import { gameState, switchTurn } from "./models/gameState.js";
import { startGame, broadcastGameState } from "./services/GameService.js";
import { getRandomCard } from "./utils/getRandomCard.js";
import { calculateHandValue } from "./utils/calculateHandValue.js";

import { END_VALUE } from "./config/constants.js";

const io = new Server(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  if (!gameState.player1) {
    gameState.player1 = socket.id;
    socket.emit("role", "player1");

    if (gameState.gameStarted) {
      broadcastGameState(io);
    }
  } else if (!gameState.player2) {
    gameState.player2 = socket.id;
    socket.emit("role", "player2");

    startGame(io);
  } else {
    // TODO: error handling
  }

  socket.on("drawCard", () => {
    const playerRole = socket.id === gameState.player1 ? "player1" : "player2";

    const newCard = getRandomCard();
    gameState.hands[playerRole].push(newCard);

    const handValue = calculateHandValue(gameState.hands[playerRole]);

    if (handValue > END_VALUE) {
      const winner = playerRole === "player1" ? "player2" : "player1";

      io.to(gameState.player1).emit("gameOver", {
        youWon: winner === "player1",
        reason: "bust",
        hands: gameState.hands,
      });

      io.to(gameState.player2).emit("gameOver", {
        youWon: winner === "player2",
        reason: "bust",
        hands: gameState.hands,
      });

      setTimeout(() => {
        gameState.hands = { player1: [], player2: [] };
        gameState.gameStarted = false;
        gameState.currentTurn = "player1";

        startGame(io);
      }, 3000);
    } else {
      switchTurn();
      broadcastGameState(io);
    }
  });

  socket.on("disconnect", () => {
    if (gameState.player1 === socket.id) {
      gameState.player1 = null;
      gameState.gameStarted = false;
    }
    if (gameState.player2 === socket.id) {
      gameState.player2 = null;
      gameState.gameStarted = false;
    }
  });
});
