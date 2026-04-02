import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Dumbbell, AlertOctagon, Sparkles } from "lucide-react";
import type { Recommendation } from "@/types";

interface Props {
  recommendations: Recommendation[];
}

const AIInsights = ({ recommendations }: Props) => {
  // Generate insights from real recommendations, fallback to defaults
  const defaultInsights = [
    {
      icon: Droplets,
      text: "No insights yet — scan a menu to get started",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  const dynamicInsights = recommendations.length > 0
    ? recommendations.slice(0, 3).map((rec, idx) => ({
        icon: idx === 0 ? Sparkles : idx === 1 ? Dumbbell : AlertOctagon,
        text: `${rec.dish?.name}: ${rec.reason}`,
        color: idx === 0 ? "text-green-500" : idx === 1 ? "text-blue-500" : "text-orange-500",
        bg: idx === 0 ? "bg-green-50" : idx === 1 ? "bg-blue-50" : "bg-orange-50",
      }))
    : defaultInsights;

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dynamicInsights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className={`p-2 rounded-full ${insight.bg}`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none mt-1">
                  {insight.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
