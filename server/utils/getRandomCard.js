import { CARDS } from "../config/constants.js";

export const getRandomCard = () => {
  const randomCard = Math.floor(Math.random() * CARDS.length);
  return CARDS[randomCard];
};
