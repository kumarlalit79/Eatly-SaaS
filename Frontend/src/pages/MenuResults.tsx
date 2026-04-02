import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScan, useDishes, useRecommendations } from "@/hooks/useScans";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Leaf,
  UtensilsCrossed,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronDown,
  Sparkles,
  Zap,
  AlertCircle,
} from "lucide-react";
import ErrorState from "@/components/states/ErrorState";
import { cn } from "@/lib/utils";
import type { Dish } from "@/types";

// Map API health badge (HEALTHY/MODERATE/AVOID) to display label
const badgeLabel = (badge: string) => {
  switch (badge) {
    case "HEALTHY": return "Healthy";
    case "MODERATE": return "Moderate";
    case "AVOID": return "Avoid";
    default: return badge;
  }
};

// Map API vegStatus to display diet label
const dietLabel = (vegStatus: string) => {
  return vegStatus === "VEG" ? "Veg" : "Non-Veg";
};

const MenuResults = () => {
  const navigate = useNavigate();
  const { scanId } = useParams<{ scanId: string }>();

  // State
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("healthiest");
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);

  // Build API filter params from UI filter
  const filterParams: Record<string, string> = {};
  if (activeFilter === "Veg") filterParams.vegStatus = "VEG";
  else if (activeFilter === "Non-Veg") filterParams.vegStatus = "NON_VEG";
  else if (activeFilter === "Healthy") filterParams.badge = "HEALTHY";
  else if (activeFilter === "Moderate") filterParams.badge = "MODERATE";
  else if (activeFilter === "Avoid") filterParams.badge = "AVOID";

  if (sortOption === "healthiest") filterParams.sort = "healthiest";
  else if (sortOption === "unhealthiest") filterParams.sort = "unhealthiest";
  else if (sortOption === "alphabetical") filterParams.sort = "alphabetical";

  const { data: scanRes } = useScan(scanId!);
  const { data: dishesRes } = useDishes(scanId!, filterParams);
  const { data: recRes } = useRecommendations(scanId!);

  const scan = scanRes?.data?.scan;
  const dishes: Dish[] = dishesRes?.data?.dishes || [];
  const recommendations = recRes?.data?.recommendations || [];

  const scanData = {
    restaurantName: scan?.restaurantName || "Unknown",
    scanDate: scan?.createdAt
      ? new Date(scan.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    totalItems: scan?.totalDishes || 0,
    stats: {
      healthy: scan?.healthyCount || 0,
      moderate: scan?.moderateCount || 0,
      avoid: scan?.avoidCount || 0,
      veg: scan?.vegCount || 0,
      nonVeg: scan?.nonVegCount || 0,
    },
  };

  const topRecommendations = recommendations.slice(0, 3).map((r: any) => ({
    id: r.dish.id,
    name: r.dish.name,
    diet: dietLabel(r.dish.vegStatus),
    reason: r.reason,
    healthScore: r.dish.healthScore,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        {/* Upgrade Banner */}
        {showUpgradeBanner && (
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-3 rounded-lg shadow-md flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-medium">
                You have 1 scan left on your Free plan.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/upgrade")}
                className="text-sm font-bold underline hover:text-indigo-100 transition-colors"
              >
                Upgrade for Unlimited
              </button>
              <button
                onClick={() => setShowUpgradeBanner(false)}
                className="text-white/80 hover:text-white"
              >
                <span className="sr-only">Dismiss</span>×
              </button>
            </div>
          </div>
        )}

        {/* Top Summary Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Menu Analysis Results
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium text-gray-700">
                {scanData.restaurantName}
              </span>
              <span>•</span>
              <span>{scanData.scanDate}</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {scanData.totalItems} items analyzed
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Scan Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <SummaryCard
            title="Healthy Options"
            count={scanData.stats.healthy}
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            bgColor="bg-green-50"
            textColor="text-green-700"
            borderColor="border-green-100"
          />
          <SummaryCard
            title="Moderate"
            count={scanData.stats.moderate}
            icon={<Info className="w-5 h-5 text-yellow-600" />}
            bgColor="bg-yellow-50"
            textColor="text-yellow-700"
            borderColor="border-yellow-100"
          />
          <SummaryCard
            title="Avoid"
            count={scanData.stats.avoid}
            icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
            bgColor="bg-red-50"
            textColor="text-red-700"
            borderColor="border-red-100"
          />
          <SummaryCard
            title="Vegetarian"
            count={scanData.stats.veg}
            icon={<Leaf className="w-5 h-5 text-green-600" />}
            bgColor="bg-green-50"
            textColor="text-green-700"
            borderColor="border-green-100"
          />
          <SummaryCard
            title="Non-Veg"
            count={scanData.stats.nonVeg}
            icon={<UtensilsCrossed className="w-5 h-5 text-red-600" />}
            bgColor="bg-red-50"
            textColor="text-red-700"
            borderColor="border-red-100"
          />
        </div>

        {/* Top Recommendations */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900">
              Top Recommendations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRecommendations.map((item: any) => (
              <Card
                key={`rec-${item.id}`}
                className="border-green-200 bg-green-50/50 shadow-sm hover:shadow-md transition-all"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                      Top Pick
                    </Badge>
                    <div className="flex items-center gap-1">
                      {item.diet === "Veg" ? (
                        <Leaf className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-green-700">{item.reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Filters & Sorting */}
        <div className="sticky top-0 z-10 flex flex-col items-start justify-between gap-4 border-b bg-[#F8F9FA] pb-4 pt-2 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2">
            {["All", "Veg", "Non-Veg", "Healthy", "Moderate", "Avoid"].map(
              (filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "rounded-full transition-all",
                    activeFilter === filter
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  {filter}
                </Button>
              ),
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-sm text-gray-500">
              Sort by:
            </span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthiest">Healthiest First</SelectItem>
                <SelectItem value="unhealthiest">Unhealthiest First</SelectItem>
                <SelectItem value="alphabetical">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Menu Items List */}
        <div className="space-y-4">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} scanId={scanId!} />
            ))
          ) : (
            <div className="py-8">
              <ErrorState
                title="No items match your filter"
                description="Try adjusting your filters to see more menu items."
                icon={<AlertCircle className="w-10 h-10 text-yellow-500" />}
                actionLabel="Clear Filters"
                onAction={() => setActiveFilter("All")}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// --- Sub-components ---

interface SummaryCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const SummaryCard = ({
  title,
  count,
  icon,
  bgColor,
  textColor,
  borderColor,
}: SummaryCardProps) => {
  return (
    <Card
      className={cn(
        "border shadow-sm transition-all hover:shadow-md",
        borderColor,
        bgColor,
      )}
    >
      <CardContent className="flex h-full flex-col justify-between p-5">
        <div className="mb-2 flex items-start justify-between">
          <div className={cn("rounded-lg bg-white/60 p-2", textColor)}>
            {icon}
          </div>
        </div>
        <div>
          <div className="mb-1 text-3xl font-bold text-gray-900">{count}</div>
          <div className={cn("text-sm font-medium", textColor)}>{title}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface DishCardProps {
  dish: Dish;
  scanId: string;
}

const DishCard = ({ dish, scanId }: DishCardProps) => {
  const navigate = useNavigate();

  const diet = dietLabel(dish.vegStatus);
  const status = badgeLabel(dish.healthBadge);

  const getStatusColor = (s: string) => {
    switch (s) {
      case "Healthy":
        return "bg-green-100 text-green-800 border-green-200";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Avoid":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      className="transition-shadow duration-200 hover:shadow-md cursor-pointer"
      onClick={() => navigate(`/dish/${scanId}/${dish.id}`)}
    >
      <CardContent className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">{dish.name}</h3>
            <div className="flex items-center gap-2">
              {diet === "Veg" ? (
                <div
                  title="Vegetarian"
                  className="flex h-4 w-4 items-center justify-center border border-green-600 p-[1px]"
                >
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                </div>
              ) : (
                <div
                  title="Non-Vegetarian"
                  className="flex h-4 w-4 items-center justify-center border border-red-600 p-[1px]"
                >
                  <div className="h-2 w-2 rounded-full bg-red-600" />
                </div>
              )}
              <Badge
                variant="outline"
                className={cn("font-medium", getStatusColor(status))}
              >
                {status}
              </Badge>
            </div>
          </div>
          <p className="text-gray-600">{dish.description}</p>
          {dish.healthReason && (
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <Info className="h-3 w-3" /> {dish.healthReason}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 gap-1 border-gray-300"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/dish/${scanId}/${dish.id}`);
          }}
        >
          View Details
          <ChevronDown className="h-3 w-3 text-gray-500" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuResults;
