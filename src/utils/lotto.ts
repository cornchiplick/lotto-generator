import {Constants} from "@/constants/constants";
import {LottoResultTable, ValidatePriceReturn} from "@/types/Lotto";
import {KeyboardEvent} from "react";

export const validatePrice = (price: number | null): ValidatePriceReturn => {
  if (!price) return {message: "", valid: false};

  if (price < Constants.LOTTO_PRICE_PER_GAME) {
    return {message: "최소 1,000원 이상 입력해주세요.", valid: false};
  }

  if (price % Constants.LOTTO_PRICE_PER_GAME !== 0) {
    return {message: "1,000원 단위로 입력해주세요.", valid: false};
  }
  return {message: "", valid: true};
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

  const bonusNumber = Array.from(numbers)[index];
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

  lottoNumbers.forEach((numbers) => {
    const matchedNumbers = numbers.filter((number) => winningNumbers.includes(number));
    // 매칭된 번호 수 < 3 : 꽝
    if (matchedNumbers.length < 3) {
      fail++;
      return;
    }

    // 매칭된 번호 수 === 3 : 5등
    if (matchedNumbers.length === 3) {
      fifth++;
      return;
    }

    // 매칭된 번호 수 === 4 : 4등
    if (matchedNumbers.length === 4) {
      fourth++;
      return;
    }

    // 매칭된 번호 수 === 6 : 1등
    if (matchedNumbers.length === 6) {
      first++;
      return;
    }
    // 매칭된 번호 수 === 5
    if (matchedNumbers.length === 5) {
      // 보너스 번호를 포함하는 경우 : 2등
      if (numbers.includes(bonusNumber)) {
        second++;
        return;
      }

      // 보너스 번호를 포함하지 않는 경우 : 3등
      third++;
    }
  });

  return {first, second, third, fourth, fifth, fail};
};
