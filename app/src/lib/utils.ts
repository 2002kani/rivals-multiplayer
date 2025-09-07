import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateHandValue = (hand: string[]) => {
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

  while (value > 16 && xCount > 0) {
    value -= 5;
    xCount -= 1;
  }
  return value;
};
