import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const ErrorState = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: ErrorStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-xl bg-gray-50 border border-dashed border-gray-300 min-h-[400px] animate-in fade-in zoom-in-95 duration-500",
        className,
      )}
    >
      <div className="bg-white p-4 rounded-full shadow-sm mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mb-8">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="lg" className="shadow-sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
