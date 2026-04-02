import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import HealthChart from "@/components/dashboard/HealthChart";
import AIInsights from "@/components/dashboard/AIInsights";
import TopRecommendations from "@/components/dashboard/TopRecommendations";
import MenuItemsTable from "@/components/dashboard/MenuItemsTable";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecentScans, useRecommendations, useDishes } from "@/hooks/useScans";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useRecentScans();
  const scans = data?.data?.scans || [];
  const latestScan = scans[0];

  const { data: dishesRes } = useDishes(latestScan?.id || "", {});
  const { data: recRes } = useRecommendations(latestScan?.id || "");

  const dishes = dishesRes?.data?.dishes || [];
  const recommendations = recRes?.data?.recommendations || [];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!latestScan) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h2 className="text-2xl font-bold mb-2">No scans yet</h2>
          <p className="text-muted-foreground mb-6">
            Scan your first menu to see insights
          </p>
          <Button onClick={() => navigate("/upload")}>
            <Camera className="w-4 h-4 mr-2" />
            Scan Your First Menu
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Menu Insights &amp; Analysis
          </h1>
          <Button
            variant="outline"
            onClick={() => navigate("/history")}
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            View History
          </Button>
        </div>

        {/* Hero Banner */}
        <div className="bg-white rounded-xl p-8 border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {latestScan.restaurantName || "Your Menu Is Clearer Today"}
            </h2>
            <p className="text-gray-500">
              Eatly analyzed this menu and highlighted the healthiest picks
              instantly.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-[#1B4D3E] hover:bg-[#153A2F] text-white gap-2 shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate("/upload")}
          >
            <Camera className="w-4 h-4" />
            Scan New Menu
          </Button>
        </div>

        {/* Stats & Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            <StatsCards scan={latestScan} />

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <HealthChart scan={latestScan} />
            </div>
          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-8">
            <AIInsights recommendations={recommendations} />
            <TopRecommendations recommendations={recommendations} />
          </div>
        </div>

        {/* Menu Items Table */}
        <MenuItemsTable dishes={dishes.slice(0, 5)} scanId={latestScan.id} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
