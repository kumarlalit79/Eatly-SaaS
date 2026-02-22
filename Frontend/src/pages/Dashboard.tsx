import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import HealthChart from "@/components/dashboard/HealthChart";
import AIInsights from "@/components/dashboard/AIInsights";
import TopRecommendations from "@/components/dashboard/TopRecommendations";
import MenuItemsTable from "@/components/dashboard/MenuItemsTable";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Menu Insights & Analysis
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
              Your Menu Is Clearer Today
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
            <StatsCards />

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <HealthChart />
            </div>
          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-8">
            <AIInsights />
            <TopRecommendations />
          </div>
        </div>

        {/* Menu Items Table */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Menu Items</h3>
          <MenuItemsTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
