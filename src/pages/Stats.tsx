import Card from "@/components/Card";
import NumberBadge from "@/components/NumberBadge";
import {Constants, LOTTO_RANK_MAP} from "@/constants/constants";
import {useLottoStorage} from "@/hook/useLottoStorage";
import {useEffect, useState} from "react";

interface TopNumber {
  number: number;
  count: number;
  percentage: number;
}

const Stats = () => {
  const {state} = useLottoStorage(Constants.LOTTO_STORAGE_KEY);
  const [topNumbers, setTopNumbers] = useState<TopNumber[]>([]);
  const [winningProbability, setWinningProbability] = useState({});

  useEffect(() => {
    // 가장 많이 나온 번호 TOP 10
    const numberCounts = state
      .map((lotto) => [...lotto.winningNumbers, lotto.bonusNumber])
      .flat()
      .reduce((acc: {[key: number]: number}, number: number) => {
        acc[number] = (acc[number] || 0) + 1;
        return acc;
      }, {});

    const sortedNumbers = Object.entries(numberCounts)
      .map(([number, count]) => ({number: parseInt(number), count}))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const totalCount = Object.values(numberCounts).reduce((acc, count) => acc + count, 0);
    const topNumbersPercent = sortedNumbers.map(({number, count}) => ({
      number,
      count,
      percentage: (count / totalCount) * 100,
    }));

    setTopNumbers(topNumbersPercent);

    // 당첨 확률 분석
    const totalRound = state
      .map((lotto) => lotto.ticketCount)
      .reduce((acc, count) => acc + count, 0);
    const winCountStats = state.reduce(
      (acc, lotto) => {
        acc.first += lotto.results.first;
        acc.second += lotto.results.second;
        acc.third += lotto.results.third;
        acc.fourth += lotto.results.fourth;
        acc.fifth += lotto.results.fifth;
        acc.fail += lotto.results.fail;
        return acc;
      },
      {first: 0, second: 0, third: 0, fourth: 0, fifth: 0, fail: 0}
    );
    setWinningProbability({
      first: (winCountStats.first / totalRound) * 100,
      second: (winCountStats.second / totalRound) * 100,
      third: (winCountStats.third / totalRound) * 100,
      fourth: (winCountStats.fourth / totalRound) * 100,
      fifth: (winCountStats.fifth / totalRound) * 100,
      fail: (winCountStats.fail / totalRound) * 100,
    });
  }, [state]);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">로또 번호 분석</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 자주 나오는 번호 카드 */}
        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">가장 많이 나온 번호 TOP 10</h2>
            <p className="text-sm text-gray-600">
              {`(기록된 시뮬레이션의 `}
              <span className="font-bold text-black">당첨번호 + 보너스 번호</span>
              {` 기준)`}
            </p>
          </div>

          <div className="space-y-2">
            {topNumbers.map(({number, count, percentage}) => (
              <div key={number}>
                <NumberBadge number={number} count={count} percentage={percentage} />
              </div>
            ))}
          </div>
        </Card>

        {/* 당첨 확률 카드 */}
        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">당첨 확률 분석</h2>
            <p className="text-sm text-gray-600">(전체 시뮬레이션 기준)</p>
          </div>

          <div className="space-y-3">
            {Object.entries(winningProbability).map(([rank, probability]) => (
              <div
                key={rank}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="font-medium">{LOTTO_RANK_MAP[rank] ?? ""}</span>
                <div className="text-right">
                  <span className="font-mono">{(probability as number).toFixed(5)}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Stats;
