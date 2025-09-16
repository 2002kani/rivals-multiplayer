import { gameState } from "../models/gameState.js";
import { calculateHandValue } from "../utils/calculateHandValue.js";
import { getRandomCard } from "../utils/getRandomCard.js";

export const broadcastGameState = (io, reveal = false) => {
  if (gameState.player1 && gameState.player2) {
    io.to(gameState.player1).emit("gameUpdate", {
      myHand: gameState.hands.player1,
      myHandValue: calculateHandValue(gameState.hands.player1),
      enemyHand: reveal
        ? gameState.hands.player2
        : gameState.hands.player2.map(() => "?"),
      enemyHandValue: reveal
        ? calculateHandValue(gameState.hands.player2)
        : "?",
      currentTurn: gameState.currentTurn,
      myRole: "player1",
      stands: {
        player1: gameState.stands.player1,
        player2: gameState.stands.player2,
      },
    });

    io.to(gameState.player2).emit("gameUpdate", {
      myHand: gameState.hands.player2,
      myHandValue: calculateHandValue(gameState.hands.player2),
      enemyHand: reveal
        ? gameState.hands.player1
        : gameState.hands.player1.map(() => "?"),
      enemyHandValue: reveal
        ? calculateHandValue(gameState.hands.player1)
        : "?",
      currentTurn: gameState.currentTurn,
      myRole: "player2",
      stands: {
        player1: gameState.stands.player1,
        player2: gameState.stands.player2,
      },
    });
  }
};

export const startGame = (io) => {
  if (gameState.player1 && gameState.player2 && !gameState.gameStarted) {
    gameState.hands.player1 = [getRandomCard()];
    gameState.hands.player2 = [getRandomCard()];
    gameState.currentTurn = "player1";
    gameState.gameStarted = true;

    broadcastGameState(io);
  }
};
