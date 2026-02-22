import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Starters", healthy: 4, moderate: 3, avoid: 1 },
  { name: "Mains", healthy: 3, moderate: 5, avoid: 4 },
  { name: "Desserts", healthy: 1, moderate: 2, avoid: 1 },
  { name: "Drinks", healthy: 5, moderate: 1, avoid: 0 },
];

const HealthChart = () => {
  return (
    <Card className="col-span-4 shadow-sm">
      <CardHeader>
        <CardTitle>Health Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAvoid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="healthy"
              stackId="1"
              stroke="#16a34a"
              fill="url(#colorHealthy)"
              name="Healthy"
            />
            <Area
              type="monotone"
              dataKey="moderate"
              stackId="1"
              stroke="#d97706"
              fill="url(#colorModerate)"
              name="Moderate"
            />
            <Area
              type="monotone"
              dataKey="avoid"
              stackId="1"
              stroke="#dc2626"
              fill="url(#colorAvoid)"
              name="Avoid"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span>Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-600" />
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span>Avoid</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthChart;
