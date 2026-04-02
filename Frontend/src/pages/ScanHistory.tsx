import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Calendar,
  Utensils,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Edit2,
  Eye,
} from "lucide-react";
import { useDeleteScan, useScanHistory } from "@/hooks/useScans";
import type { Scan } from "@/types";

const ScanHistory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page] = useState(1);
  const { data, isLoading } = useScanHistory(search, page);
  const deleteScan = useDeleteScan();

  const scans: Scan[] = data?.data?.scans || [];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Past Scans
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage your previous menu analyses.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search restaurants..."
              className="pl-9 bg-white border-gray-200 focus:border-primary focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">Loading scans...</p>
          </div>
        )}

        {/* History List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && scans.length > 0 ? (
            scans.map((scan) => (
              <Card
                key={scan.id}
                className="hover:shadow-md transition-shadow duration-200 border-gray-200"
              >
                <CardContent className="p-5 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                        {scan.restaurantName || "Untitled Menu"}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(scan.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => navigate(`/results/${scan.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" /> View Results
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="w-4 h-4 mr-2" /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => deleteScan.mutate(scan.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-gray-100">
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                      <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
                        <Utensils className="w-3 h-3" /> Items
                      </div>
                      <div className="font-bold text-gray-900">
                        {scan.totalDishes}
                      </div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-green-50">
                      <div className="text-xs text-green-600 mb-1 flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Healthy
                      </div>
                      <div className="font-bold text-green-700">
                        {scan.healthyCount}
                      </div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-red-50">
                      <div className="text-xs text-red-600 mb-1 flex items-center justify-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Avoid
                      </div>
                      <div className="font-bold text-red-700">
                        {scan.avoidCount}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                    onClick={() => navigate(`/results/${scan.id}`)}
                  >
                    View Analysis
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : !isLoading ? (
            <div className="col-span-full py-12 text-center">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No scans found
              </h3>
              <p className="text-gray-500 mt-1">
                {search
                  ? "Try searching for a different restaurant."
                  : "Upload your first menu to get started."}
              </p>
              {search && (
                <Button
                  variant="link"
                  onClick={() => setSearch("")}
                  className="mt-2 text-primary"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ScanHistory;
