import Card, {CardContent, CardHeader} from "@/components/Card";
import {Constants, LOTTO_RANK_MAP, URL} from "@/constants/constants";
import {useLottoStorage} from "@/hook/useLottoStorage";
import {useNavigate} from "react-router-dom";

const Record = () => {
  const navigate = useNavigate();
  const {state, clear} = useLottoStorage(Constants.LOTTO_STORAGE_KEY);

  return (
    <div className="flex w-full max-w-5xl flex-col gap-3 rounded-lg bg-white p-6 shadow-md">
      <div className="flex w-full max-w-5xl flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">로또 시뮬 결과</h1>
          <button
            className="h-10 w-20 rounded-md bg-primary px-4 py-2 text-sm font-bold text-white"
            onClick={clear}>
            초기화
          </button>
        </div>

        <div className="grid gap-4">
          {!!state.length ? (
            state.map((history) => (
              <Card key={history.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold leading-none tracking-tight">
                      {history.id} 회차
                    </h3>
                    <span className="text-sm text-gray-600">
                      구매금액: {history.purchaseAmount.toLocaleString()}원 (
                      {(history.purchaseAmount / 1000).toLocaleString()}장)
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 font-semibold">당첨 번호</h3>
                      <p className="rounded-md bg-yellow-100 p-2">
                        {history.winningNumbers.join(", ")}
                        <span className="font-bold">{` + ${history.bonusNumber}`}</span>
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">당첨 결과</h3>
                      <div className="grid grid-rows-2 gap-2">
                        {Object.entries(history.summary).map(([rank, count]) => (
                          <div
                            key={rank}
                            className="flex items-center justify-between rounded-md bg-gray-50 p-2">
                            <span className="font-medium">{LOTTO_RANK_MAP[rank] ?? ""}</span>
                            <span className="text-gray-600">{count}개</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex h-40 flex-col items-center justify-center gap-6 text-gray-500">
              <p className="font-semibold">시뮬레이션 결과가 없습니다.</p>
              <button
                className="h-10 rounded-md bg-primary px-4 py-2 text-sm font-bold text-white"
                onClick={() => navigate(URL.HOME)}>
                시뮬레이션 하러 가기 →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Record;
