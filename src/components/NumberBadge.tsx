interface NumberBadgeProps {
  number: number;
  count: number;
  percentage: number;
}

const NumberBadge = ({number, count, percentage}: NumberBadgeProps) => (
  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
        {number}
      </span>
      <span className="font-medium">총 {count}회</span>
    </div>
    <span className="text-gray-600">{percentage.toFixed(1)}%</span>
  </div>
);

export default NumberBadge;
