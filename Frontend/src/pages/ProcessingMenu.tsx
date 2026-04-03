import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScan } from "@/hooks/useScans";

const steps = [
  "Extracting menu text",
  "Identifying dishes",
  "Detecting veg/non-veg",
  "Analyzing health score",
  "Generating recommendations",
];

const ProcessingMenu = () => {
  const navigate = useNavigate();
  const { scanId } = useParams<{ scanId: string }>();
  const { data, isError } = useScan(scanId!);
  const scan = data?.data?.scan;

  
  useEffect(() => {
    if (scan?.status === "COMPLETED") {
      setTimeout(() => navigate(`/results/${scanId}`), 800);
    }
  }, [scan?.status, scanId, navigate]);

  
  if (isError || scan?.status === "FAILED") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-4">
            <p className="text-red-500 text-lg font-medium">
              Failed to process menu.
            </p>
            <p className="text-muted-foreground">
              {scan?.errorMessage || "Please try again."}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  
  const statusToProgress: Record<string, number> = {
    PENDING: 15,
    PROCESSING: 60,
    COMPLETED: 100,
    FAILED: 100,
  };

  const statusToStep: Record<string, number> = {
    PENDING: 0,
    PROCESSING: 2,
    COMPLETED: 4,
    FAILED: 4,
  };

  const progress = statusToProgress[scan?.status ?? "PENDING"] ?? 15;
  const currentStep = statusToStep[scan?.status ?? "PENDING"] ?? 0;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[80vh] animate-in fade-in duration-700">
        <div className="max-w-xl w-full space-y-8 text-center">
          {/* Header */}
          <div className="space-y-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-primary animate-pulse" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analyzing Your Menu
            </h1>
            <p className="text-muted-foreground text-lg">
              Our AI is processing the menu image to extract details and health
              insights.
            </p>
          </div>

          {/* Progress Card */}
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 space-y-8">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Processing...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3 bg-gray-100" />
              </div>

              {/* Step Indicators */}
              <div className="space-y-4 text-left">
                {steps.map((step, index) => {
                  const isCompleted = index < currentStep;
                  const isCurrent = index === currentStep;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center gap-3 transition-all duration-300",
                        isCurrent ? "scale-105 pl-2" : "",
                        index > currentStep
                          ? "opacity-40 blur-[0.5px]"
                          : "opacity-100",
                      )}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                          isCompleted
                            ? "bg-primary border-primary"
                            : isCurrent
                              ? "border-primary"
                              : "border-gray-200",
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : isCurrent ? (
                          <Loader2 className="w-3 h-3 text-primary animate-spin" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-200" />
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-lg transition-colors",
                          isCurrent
                            ? "font-semibold text-primary"
                            : isCompleted
                              ? "text-gray-700"
                              : "text-gray-400",
                        )}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Hint Text */}
              <p className="text-sm text-gray-400 animate-pulse">
                Usually takes 10–20 seconds.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProcessingMenu;
