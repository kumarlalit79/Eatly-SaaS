import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TopRecommendations = () => {
  const recommendations = [
    {
      name: "Grilled Chicken Salad",
      badge: "Healthy",
      badgeColor: "bg-green-100 text-green-700 hover:bg-green-100",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      name: "Veggie Bowl",
      badge: "Healthy",
      badgeColor: "bg-green-100 text-green-700 hover:bg-green-100",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      name: "Lentil Soup",
      badge: "Moderate",
      badgeColor: "bg-amber-100 text-amber-700 hover:bg-amber-100",
      image:
        "https://images.unsplash.com/photo-1547592166-23acbe3a624b?auto=format&fit=crop&q=80&w=100&h=100",
    },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Recommended Dishes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recommendations.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none">{item.name}</p>
              </div>
              <Badge className={`${item.badgeColor} border-0`}>
                {item.badge}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopRecommendations;
