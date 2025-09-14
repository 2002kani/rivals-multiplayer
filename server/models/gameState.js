export let gameState = {
  player1: null,
  player2: null,
  currentTurn: "player1",
  gameStarted: false,
  hands: {
    player1: [],
    player2: [],
  },
};

export const switchTurn = () => {
  gameState.currentTurn =
    gameState.currentTurn === "player1" ? "player2" : "player1";
};
