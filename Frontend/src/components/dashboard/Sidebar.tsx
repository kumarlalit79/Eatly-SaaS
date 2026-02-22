import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Camera,
  History,
  Heart,
  Crown,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const SidebarContent = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Camera, label: "Scan Menu", path: "/upload" },
    { icon: History, label: "History", path: "/history" },
    { icon: Crown, label: "Upgrade", path: "/upgrade" },
    { icon: Settings, label: "Settings", path: "/profile" },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F8F9FA] border-r border-[#EBEBEB]">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#1B4D3E] to-[#2D7A62] bg-clip-text text-transparent italic">
            Eatly
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 mb-1 font-medium ${
                isActive(item.path)
                  ? "bg-[#E8F2EF] text-[#1B4D3E] hover:bg-[#E8F2EF] hover:text-[#1B4D3E]"
                  : "text-muted-foreground hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#EBEBEB]">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          <a href="/">Sign Out</a>
        </Button>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="p-2">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
