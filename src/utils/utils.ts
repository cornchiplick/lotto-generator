import {KeyboardEvent} from "react";

export const validatePrice = (price: number | null) => {
  if (!price || price < 1000) {
    return "최소 1,000원 이상 입력해주세요.";
  }

  if (price % 1000 !== 0) {
    return "1,000원 단위로 입력해주세요.";
  }
  return true;
};

export const isEnter = (event: KeyboardEvent<HTMLInputElement>) => {
  return event.key === "Enter" && !event.nativeEvent?.isComposing;
};

export const generateLottoNumbers = () => {
  const numbers = new Set<number>();
  while (numbers.size < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNum);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};
