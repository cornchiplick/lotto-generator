import {generateLottoNumbers, isEnter, validatePrice} from "@/utils/utils";
import {KeyboardEvent, useState} from "react";
import {useForm} from "react-hook-form";

interface PriceForm {
  price: number | null;
}

function App() {
  const [lottoNumbers, setLottoNumbers] = useState<number[][]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<PriceForm>();

  const purchaseLotto = (data: PriceForm) => {
    if (!data.price) return;

    const tickets = Math.floor(data.price / 1000);
    const lottoNumbers = Array.from({length: tickets}, () => generateLottoNumbers());
    setLottoNumbers([...lottoNumbers]);
    reset({price: null});
  };

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isEnter(e)) {
      handleSubmit(purchaseLotto)();
    }
  };

  const renderInterface = (
    <div className="flex flex-col gap-1">
      <div className="flex items-end space-x-2">
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="price" className="text-sm">
            로또 구매 금액
          </label>
          <input
            id="price"
            type="number"
            {...register("price", {validate: validatePrice})}
            className="flex h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-700 focus:border-gray-500 focus:outline-none"
            placeholder="금액을 입력하세요"
            onKeyUp={handleKeyup}
          />
        </div>
        <button
          className="bg-primary h-10 min-w-[60px] rounded-md px-4 py-2 text-sm text-white"
          onClick={handleSubmit(purchaseLotto)}>
          구매
        </button>
      </div>
      {errors.price?.message && <p className="text-sm text-red-500">{errors.price?.message}</p>}
    </div>
  );

  const renderLottoNumbers = (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">구매한 로또 번호</h2>
      {!!lottoNumbers.length && (
        <ul className="space-y-2">
          {lottoNumbers.map((numbers) => (
            <li className="rounded bg-gray-100 p-2">{numbers.join(", ")}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderResult = (
    <div className="flex flex-col gap-2">
      <button className="bg-primary h-10 w-full rounded-md px-4 py-2 text-sm text-white">
        결과 확인
      </button>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">당첨 번호</h2>
          <p className="rounded bg-yellow-100 p-2">
            11, 17, 19, 31, 36, 38
            <span className="font-bold">{` + 44`}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">당첨 결과</h3>
          <ul className="space-y-1">
            <li>1등: 0 개</li>
            <li>1등: 0 개</li>
            <li>1등: 0 개</li>
            <li>1등: 0 개</li>
            <li>1등: 0 개</li>
            <li>1등: 0 개</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex w-full max-w-md flex-col gap-3 rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-center text-2xl font-bold">로또 어플리케이션</h1>
        {renderInterface}
        {renderLottoNumbers}
        {renderResult}
        <button className="bg-primary h-10 w-full rounded-md px-4 py-2 text-sm text-white">
          처음부터 다시하기
        </button>
      </div>
    </main>
  );
}

export default App;
