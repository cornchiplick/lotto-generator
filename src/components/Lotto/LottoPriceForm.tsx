import {PriceForm} from "@/types/Lotto";
import {validatePrice} from "@/utils/lotto";
import {KeyboardEvent} from "react";
import {FieldErrors, UseFormRegister} from "react-hook-form";

interface LottoPriceFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<PriceForm>;
  isValid: boolean;
  onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  errors: FieldErrors<PriceForm>;
}

const LottoPriceForm = ({onSubmit, register, isValid, onKeyUp, errors}: LottoPriceFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-1">
        <div className="flex items-end space-x-2">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="price" className="text-sm">
              로또 구매 금액
            </label>
            <input
              id="price"
              type="number"
              {...register("price", {
                validate: (value) => {
                  const {message, valid} = validatePrice(value);
                  return valid || message;
                },
              })}
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-700 focus:border-gray-500 focus:outline-none"
              placeholder="금액을 입력하세요"
              onKeyUp={isValid ? onKeyUp : undefined}
            />
          </div>
          <button
            className="h-10 min-w-[60px] rounded-md bg-primary px-4 py-2 text-sm text-white disabled:opacity-25"
            disabled={!isValid}>
            구매
          </button>
        </div>
        {errors.price?.message && <p className="text-sm text-red-500">{errors.price?.message}</p>}
      </div>
    </form>
  );
};

export default LottoPriceForm;
