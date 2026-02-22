import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  ArrowLeft,
  ChefHat,
  Flame,
  Info,
  Leaf,
  ThumbsDown,
  ThumbsUp,
  Utensils,
  Wheat,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { allItems, MenuItem, HealthStatus } from "@/data/mockData";

const DishDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Lookup dish by ID, fallback to first item if not found
  const dishData: MenuItem =
    allItems.find((item) => item.id === id) || allItems[0];

  // Helper to get status color
  const getStatusColor = (status: HealthStatus) => {
    switch (status) {
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
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-gray-900 -ml-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu Results
        </Button>

        {/* Dish Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {dishData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "px-3 py-1 text-sm font-medium",
                    dishData.diet === "Veg"
                      ? "border-green-600 text-green-700 bg-green-50"
                      : "border-red-600 text-red-700 bg-red-50",
                  )}
                >
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      dishData.diet === "Veg" ? "bg-green-600" : "bg-red-600",
                    )}
                  />
                  {dishData.diet === "Veg" ? "Vegetarian" : "Non-Vegetarian"}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "px-3 py-1 text-sm font-medium",
                    getStatusColor(dishData.status),
                  )}
                >
                  {dishData.status} Choice
                </Badge>
                <span className="text-sm text-gray-500 font-medium px-2">
                  Health Score: {dishData.healthScore}/100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Explanation & Ingredients */}
          <div className="md:col-span-2 space-y-8">
            {/* Explanation */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Info className="w-5 h-5 text-gray-400" />
                What is this dish?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {dishData.explanation}
              </p>
            </section>

            <div className="border-t border-gray-100 my-6" />

            {/* Ingredients */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Wheat className="w-5 h-5 text-gray-400" />
                Ingredients
              </h2>
              <div className="flex flex-wrap gap-2">
                {dishData.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </section>

            <div className="border-t border-gray-100 my-6" />

            {/* Cooking Style */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-gray-400" />
                Cooking Style
              </h2>
              <div className="flex flex-wrap gap-2">
                {dishData.cookingStyle.map((style, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100 flex items-center gap-2"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    {style}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Health Analysis Card */}
          <div className="md:col-span-1">
            <Card
              className={cn(
                "border-2 shadow-sm h-full",
                dishData.status === "Healthy"
                  ? "border-green-100 bg-green-50/30"
                  : dishData.status === "Moderate"
                    ? "border-yellow-100 bg-yellow-50/30"
                    : "border-red-100 bg-red-50/30",
              )}
            >
              <CardContent className="p-6 space-y-6">
                {/* Health Reason */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-gray-500" />
                    Why we rated it {dishData.status}
                  </h3>
                  <p className="text-gray-700 bg-white p-3 rounded-lg border border-gray-100 text-sm leading-relaxed shadow-sm">
                    {dishData.reason}
                  </p>
                </div>

                {/* Best For */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-green-700 flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" /> Best For
                  </h3>
                  <ul className="space-y-2">
                    {dishData.bestFor.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <Leaf className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Avoid If */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-red-700 flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4" /> Avoid If
                  </h3>
                  <ul className="space-y-2">
                    {dishData.avoidIf.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DishDetails;
