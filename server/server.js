import { Server } from "socket.io";

import { gameState, switchTurn } from "./models/gameState.js";
import { startGame, broadcastGameState } from "./services/GameService.js";
import { getRandomCard } from "./utils/getRandomCard.js";
import { calculateHandValue } from "./utils/calculateHandValue.js";
import { resetGame } from "./utils/resetGame.js";

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
    socket.emit("gameFull");
  }

  socket.on("drawCard", () => {
    const playerRole = socket.id === gameState.player1 ? "player1" : "player2";

    const newCard = getRandomCard();
    gameState.hands[playerRole].push(newCard);

    const handValue = calculateHandValue(gameState.hands[playerRole]);

    if (handValue > END_VALUE) {
      broadcastGameState(io);
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

      setTimeout(() => resetGame(io), 3000);
    } else {
      if (playerRole === "player1" && !gameState.stands.player2) {
        switchTurn();
      } else if (playerRole === "player2" && !gameState.stands.player1) {
        switchTurn();
      }

      broadcastGameState(io);
    }
  });

  socket.on("handleStand", () => {
    const playerRole = socket.id === gameState.player1 ? "player1" : "player2";
    gameState.stands[playerRole] = true;

    if (gameState.stands.player1 && gameState.stands.player2) {
      const value1 = calculateHandValue(gameState.hands.player1);
      const value2 = calculateHandValue(gameState.hands.player2);

      let winner = null;

      if (value1 > value2) winner = "player1";
      else if (value2 > value1) winner = "player2";
      else if (value1 === value2) winner = "both";

      io.to(gameState.player1).emit("gameOver", {
        youWon: winner === "player1",
        reason: "bothStand",
        hands: gameState.hands,
        draw: winner === "both",
      });

      io.to(gameState.player2).emit("gameOver", {
        youWon: winner === "player2",
        reason: "bothStand",
        hands: gameState.hands,
        draw: winner === "both",
      });

      setTimeout(() => resetGame(io), 3000);
    } else {
      if (playerRole === "player1" && !gameState.stands.player2) {
        gameState.currentTurn = "player2";
      } else if (playerRole === "player2" && !gameState.stands.player1) {
        gameState.currentTurn = "player1";
      }
    }

    broadcastGameState(io);
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
