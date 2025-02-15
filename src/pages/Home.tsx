import LottoPriceForm from "@/components/Lotto/LottoPriceForm";
import {Constants} from "@/constants/constants";
import {useLottoStorage} from "@/hook/useLottoStorage";
import {LottoNumber, PriceForm} from "@/types/Lotto";
import {
  generateLottoNumbers,
  generateResultNumbers,
  getResultTable,
  isEmptyObject,
  isEnter,
} from "@/utils/lotto";
import {KeyboardEvent, useState} from "react";
import {useForm} from "react-hook-form";

const Home = () => {
  const [lottoNumbers, setLottoNumbers] = useState<LottoNumber[]>([]);
  const [winningNumbers, setWinningNumbers] = useState<LottoNumber>([]);
  const [bonusNumber, setBonusNumber] = useState<number | null>(null);
  const [lottoSummary, setLottoSummary] = useState<Record<string, number>>({});
  const {setItem} = useLottoStorage(Constants.LOTTO_STORAGE_KEY);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm<PriceForm>({defaultValues: {price: null}});

  const purchaseLotto = ({price}: PriceForm) => {
    if (price === null) return;

    const tickets = price / Constants.LOTTO_PRICE_PER_GAME;
    const lottoNumbers = Array.from({length: tickets}, () => generateLottoNumbers());
    setLottoNumbers([...lottoNumbers]);
    reset();
  };

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isEnter(e)) {
      handleSubmit(purchaseLotto)();
    }
  };

  const handleCheckResult = () => {
    const {result, bonus} = generateResultNumbers();
    setWinningNumbers(result);
    setBonusNumber(bonus);

    const summary = getResultTable({lottoNumbers, winningNumbers: result, bonusNumber: bonus});
    setLottoSummary(summary);

    setItem({
      purchaseAmount: lottoNumbers.length * 1000,
      ticketCount: lottoNumbers.length,
      winningNumbers: result,
      bonusNumber: bonus,
      summary: summary,
    });
  };

  const handleReset = () => {
    setLottoNumbers([]);
    setWinningNumbers([]);
    setBonusNumber(null);
    setLottoSummary({});
    reset();
  };

  const renderLottoNumbers = (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">구매한 로또 번호</h2>
      {!!lottoNumbers.length && (
        <ul className="space-y-2">
          {lottoNumbers.map((numbers, index) => (
            <li key={index} className="rounded bg-gray-100 p-2">
              {numbers.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderResult = (
    <div className="flex flex-col gap-2">
      <button
        className="h-10 w-full rounded-md bg-primary px-4 py-2 text-sm text-white"
        onClick={handleCheckResult}>
        결과 확인
      </button>
      {!!winningNumbers.length && !isEmptyObject(lottoSummary) && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">당첨 번호</h2>
            <p className="rounded bg-yellow-100 p-2">
              {winningNumbers.join(", ")}
              <span className="font-bold">{` + ${bonusNumber}`}</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">당첨 결과</h3>
            <ul className="space-y-1">
              <li>{`1등: ${lottoSummary.first}개`}</li>
              <li>{`2등: ${lottoSummary.second}개`}</li>
              <li>{`3등: ${lottoSummary.third}개`}</li>
              <li>{`4등: ${lottoSummary.fourth}개`}</li>
              <li>{`5등: ${lottoSummary.fifth}개`}</li>
              <li>{`꽝: ${lottoSummary.fail}개`}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-center text-2xl font-bold">로또 어플리케이션</h1>
      <LottoPriceForm
        onSubmit={handleSubmit(purchaseLotto)}
        register={register}
        isValid={isValid}
        onKeyUp={handleKeyup}
        errors={errors}
      />
      {renderLottoNumbers}
      {renderResult}
      <button
        className="h-10 w-full rounded-md bg-primary px-4 py-2 text-sm text-white"
        onClick={handleReset}>
        처음부터 다시하기
      </button>
    </div>
  );
};

export default Home;
