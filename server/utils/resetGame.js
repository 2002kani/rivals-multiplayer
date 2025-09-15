import { gameState } from "../models/gameState.js";
import { startGame } from "../services/GameService.js";

export const resetGame = (io) => {
  gameState.hands = { player1: [], player2: [] };
  gameState.gameStarted = false;
  gameState.currentTurn = "player1";
  gameState.stands = { player1: false, player2: false };

  startGame(io);
};
