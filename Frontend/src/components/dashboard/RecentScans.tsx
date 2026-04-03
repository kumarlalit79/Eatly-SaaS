import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Utensils, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";


const RECENT_SCANS = [
  {
    id: 1,
    restaurantName: "La Trattoria",
    date: "Today, 10:30 AM",
    itemsCount: 12,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: 2,
    restaurantName: "Sushi Master",
    date: "Yesterday, 2:15 PM",
    itemsCount: 8,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: 3,
    restaurantName: "Burger Joint",
    date: "Feb 18, 2026",
    itemsCount: 15,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=100&h=100",
  },
];

const RecentScans = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">Recent Scans</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary text-xs hover:text-primary/80"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {RECENT_SCANS.map((scan) => (
          <div
            key={scan.id}
            className="group flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-border hover:bg-secondary/5 transition-all cursor-pointer"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={scan.image}
                alt={scan.restaurantName}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors">
                {scan.restaurantName}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <Calendar className="w-3 h-3" />
                <span>{scan.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="hidden sm:flex items-center gap-1"
              >
                <Utensils className="w-3 h-3" />
                {scan.itemsCount}
              </Badge>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}

        {RECENT_SCANS.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No scans yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentScans;
