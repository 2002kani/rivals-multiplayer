// server.js
import { Server } from "socket.io";
import { gameState, switchTurn } from "./models/GameState.js";
import { startGame, broadcastGameState } from "./service/GameService.js";
import { calculateHandValue, getRandomCard } from "./utils/gameUtils.js";
import { END_VALUE } from "./config/constants.js";

const io = new Server(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected Player: ", socket.id);

  // Rolle zuweisen
  if (!gameState.player1) {
    gameState.player1 = socket.id;
    socket.emit("role", "player1");
    console.log("Player 1 assigned:", socket.id);
  } else if (!gameState.player2) {
    gameState.player2 = socket.id;
    socket.emit("role", "player2");
    console.log("Player 2 assigned:", socket.id);

    // Spiel starten wenn beide Spieler da sind - MIT io Parameter!
    startGame(io);
  } else {
    socket.emit("error", "Game is full");
    socket.disconnect();
    return;
  }

  // Karte ziehen
  socket.on("drawCard", () => {
    const playerRole = socket.id === gameState.player1 ? "player1" : "player2";

    // Prüfen ob Spieler dran ist
    if (gameState.currentTurn !== playerRole) {
      socket.emit("error", "Not your turn!");
      return;
    }

    // Karte zur Hand hinzufügen
    const newCard = getRandomCard();
    gameState.hands[playerRole].push(newCard);

    console.log(`${playerRole} drew card: ${newCard}`);

    // Handwert prüfen
    const handValue = calculateHandValue(gameState.hands[playerRole]);

    if (handValue > END_VALUE) {
      // Spieler hat sich verschätzt - Game Over
      const winner = playerRole === "player1" ? "player2" : "player1";

      io.emit("gameOver", {
        winner: winner,
        reason: "bust",
        hands: gameState.hands,
      });

      // Game State zurücksetzen nach kurzer Verzögerung
      setTimeout(() => {
        gameState.hands = { player1: [], player2: [] };
        gameState.gameStarted = false;
        gameState.currentTurn = "player1";
        startGame(io); // MIT io Parameter!
      }, 3000);
    } else {
      // Turn wechseln und Game State broadcasten
      switchTurn();
      broadcastGameState(io);
    }
  });

  // Stand
  socket.on("stand", () => {
    const playerRole = socket.id === gameState.player1 ? "player1" : "player2";

    if (gameState.currentTurn !== playerRole) {
      socket.emit("error", "Not your turn!");
      return;
    }

    console.log(`${playerRole} stands`);

    // Hier könntest du Stand-Logic implementieren
    // Für jetzt wechseln wir einfach den Turn
    switchTurn();
    broadcastGameState(io); // MIT io Parameter!
  });

  // Disconnect handling
  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);

    if (gameState.player1 === socket.id) {
      gameState.player1 = null;
    } else if (gameState.player2 === socket.id) {
      gameState.player2 = null;
    }
    öl;
    // Game State zurücksetzen
    gameState.hands = { player1: [], player2: [] };
    gameState.gameStarted = false;
    gameState.currentTurn = "player1";

    // Anderen Spieler benachrichtigen
    io.emit("playerDisconnected");
  });
});
