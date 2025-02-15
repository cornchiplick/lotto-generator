import {Constants} from "@/constants/constants";
import {LottoResultTable} from "@/types/Lotto";
import {KeyboardEvent} from "react";

export const validatePrice = (price: number | null) => {
  if (!price) return false;

  if (price < Constants.LOTTO_PRICE_PER_GAME) {
    return "최소 1,000원 이상 입력해주세요.";
  }

  if (price % Constants.LOTTO_PRICE_PER_GAME !== 0) {
    return "1,000원 단위로 입력해주세요.";
  }
  return true;
};

export const isEnter = (event: KeyboardEvent<HTMLInputElement>) => {
  return event.key === "Enter" && !event.nativeEvent?.isComposing;
};

export const generateLottoNumbers = () => {
  const numbers = new Set<number>();
  while (numbers.size < Constants.LOTTO_WINNING_NUMBER_COUNT) {
    const randomNum = Math.floor(Math.random() * Constants.LOTTO_MAX_NUMBER) + 1;
    numbers.add(randomNum);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

export const generateResultNumbers = () => {
  const numbers = new Set<number>();
  const index = Math.floor(Math.random() * Constants.LOTTO_WINNING_NUMBER_COUNT);

  while (numbers.size < Constants.LOTTO_WINNING_NUMBER_COUNT + 1) {
    const randomNum = Math.floor(Math.random() * Constants.LOTTO_MAX_NUMBER) + 1;
    numbers.add(randomNum);
  }

  const bonusNumber = Array.from(numbers).sort((a, b) => a - b)[index];
  const result = Array.from(numbers)
    .filter((item) => item !== bonusNumber)
    .sort((a, b) => a - b);
  return {result, bonus: bonusNumber};
};

export const getResultTable = ({lottoNumbers, winningNumbers, bonusNumber}: LottoResultTable) => {
  let first = 0;
  let second = 0;
  let third = 0;
  let fourth = 0;
  let fifth = 0;
  let fail = 0;

  lottoNumbers.map((numbers) => {
    const matchedNumbers = numbers.filter((number) => winningNumbers.includes(number));
    // mns < 3 : 꽝
    if (matchedNumbers.length < 3) {
      fail++;
      return;
    }

    // mns === 3 : 5등
    if (matchedNumbers.length === 3) {
      fifth++;
      return;
    }

    // mns === 4 : 4등
    if (matchedNumbers.length === 4) {
      fourth++;
      return;
    }

    // mns === 6 : 1등
    if (matchedNumbers.length === 6) {
      first++;
      return;
    }
    // mns === 5
    if (matchedNumbers.length === 5) {
      //   includes(bn) : 2등
      if (numbers.includes(bonusNumber)) {
        second++;
        return;
      }

      //  !includes(bn) : 3등
      third++;
    }
  });

  return {first, second, third, fourth, fifth, fail};
};
