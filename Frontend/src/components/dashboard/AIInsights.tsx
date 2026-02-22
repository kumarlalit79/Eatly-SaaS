import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Dumbbell, AlertOctagon } from "lucide-react";

const AIInsights = () => {
  const insights = [
    {
      icon: Droplets,
      text: "High oil dishes detected",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Dumbbell,
      text: "3 high-protein meals recommended",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: AlertOctagon,
      text: "Desserts are sugar-heavy",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
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
