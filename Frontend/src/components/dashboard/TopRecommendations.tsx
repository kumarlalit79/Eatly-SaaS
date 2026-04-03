import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/types";

interface Props {
  recommendations: Recommendation[];
}

const TopRecommendations = ({ recommendations }: Props) => {
  
  const displayItems = recommendations.slice(0, 3).map((rec) => {
    const badge = rec.dish?.healthBadge === "HEALTHY" ? "Healthy"
      : rec.dish?.healthBadge === "MODERATE" ? "Moderate" : "Avoid";
    const badgeColor = badge === "Healthy"
      ? "bg-green-100 text-green-700 hover:bg-green-100"
      : badge === "Moderate"
        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
        : "bg-red-100 text-red-700 hover:bg-red-100";

    return {
      name: rec.dish?.name || "Unknown Dish",
      badge,
      badgeColor,
    };
  });

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Recommended Dishes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {displayItems.length > 0 ? (
            displayItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none">{item.name}</p>
                </div>
                <Badge className={`${item.badgeColor} border-0`}>
                  {item.badge}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No recommendations yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopRecommendations;
