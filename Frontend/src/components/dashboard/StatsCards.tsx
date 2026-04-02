import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, Heart, AlertTriangle, XCircle } from "lucide-react";
import type { Scan } from "@/types";

interface Props {
  scan: Scan;
}

const StatsCards = ({ scan }: Props) => {
  const stats = [
    {
      title: "Total Items",
      value: scan?.totalDishes ?? 0,
      icon: ListChecks,
      color: "text-blue-600",
      bg: "bg-blue-100",
      description: "Menu Size",
    },
    {
      title: "Healthy Picks",
      value: scan?.healthyCount ?? 0,
      icon: Heart,
      color: "text-green-600",
      bg: "bg-green-100",
      description: "Recommended",
    },
    {
      title: "Moderate",
      value: scan?.moderateCount ?? 0,
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-100",
      description: "Consume Moderately",
    },
    {
      title: "Avoid",
      value: scan?.avoidCount ?? 0,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
      description: "High Risk",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="shadow-sm hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
