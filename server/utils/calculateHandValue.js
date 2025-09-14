import { END_VALUE } from "../config/constants.js";

export const calculateHandValue = (hand) => {
  let value = 0;
  let xCount = 0;

  hand.forEach((card) => {
    if (card === "X") {
      xCount += 1;
      value += 6;
    } else {
      value += parseInt(card);
    }
  });

  while (value > END_VALUE && xCount > 0) {
    value -= 5;
    xCount -= 1;
  }
  return value;
};
