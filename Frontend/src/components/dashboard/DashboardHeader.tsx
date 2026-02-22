import { Button } from "@/components/ui/button";
import { User, History, LayoutDashboard, Crown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ScanLimitIndicator from "./ScanLimitIndicator";

const DashboardHeader = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Eatly
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/dashboard">
              <Button
                variant={isActive("/dashboard") ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/history">
              <Button
                variant={isActive("/history") ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <History className="w-4 h-4" />
                History
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ScanLimitIndicator remaining={2} total={5} />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-2 text-warning hover:text-warning-foreground hover:bg-warning/10"
            >
              <Crown className="w-4 h-4" />
              Upload
            </Button>

            <Button variant="outline" size="icon" className="rounded-full">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
