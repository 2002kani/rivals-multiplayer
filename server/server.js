import { Server } from "socket.io";

import { gameState } from "./models/gameState.js";
import { startGame, broadcastGameState } from "./services/GameService.js";

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
