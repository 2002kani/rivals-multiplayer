// service/GameService.js
import { gameState } from "../models/GameState.js";
import { getRandomCard, calculateHandValue } from "../utils/gameUtils.js";

export const broadcastGameState = (io) => {
  if (gameState.player1 && gameState.player2) {
    // An Player 1 senden
    io.to(gameState.player1).emit("gameUpdate", {
      myHand: gameState.hands.player1,
      myHandValue: calculateHandValue(gameState.hands.player1),
      enemyHand: gameState.hands.player2,
      enemyHandValue: calculateHandValue(gameState.hands.player2),
      currentTurn: gameState.currentTurn,
      myRole: "player1",
    });

    // An Player 2 senden
    io.to(gameState.player2).emit("gameUpdate", {
      myHand: gameState.hands.player2,
      myHandValue: calculateHandValue(gameState.hands.player2),
      enemyHand: gameState.hands.player1,
      enemyHandValue: calculateHandValue(gameState.hands.player1),
      currentTurn: gameState.currentTurn,
      myRole: "player2",
    });
  }
};

export const startGame = (io) => {
  if (gameState.player1 && gameState.player2 && !gameState.gameStarted) {
    // Starthand für beide Spieler
    gameState.hands.player1 = [getRandomCard()];
    gameState.hands.player2 = [getRandomCard()];
    gameState.currentTurn = "player1";
    gameState.gameStarted = true;

    broadcastGameState(io);
    console.log("Game started!");
  }
};
