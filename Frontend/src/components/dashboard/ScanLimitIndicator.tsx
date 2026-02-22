import { Zap } from "lucide-react";

interface ScanLimitIndicatorProps {
  remaining: number;
  total: number;
}

const ScanLimitIndicator = ({
  remaining = 2,
  total = 5,
}: ScanLimitIndicatorProps) => {
  const percentage = (remaining / total) * 100;

  return (
    <div className="flex items-center gap-3 bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
      <div className="relative">
        <Zap className="w-4 h-4 text-secondary fill-secondary" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-secondary-foreground whitespace-nowrap">
          {remaining} free scans left
        </span>
        <div className="w-20 h-1 bg-secondary/20 rounded-full mt-0.5 overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScanLimitIndicator;
