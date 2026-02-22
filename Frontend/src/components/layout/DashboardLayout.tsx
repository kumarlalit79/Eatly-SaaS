import { Sidebar } from "@/components/dashboard/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Sidebar />
      <div className="md:ml-64 transition-all duration-300">
        <main className="p-4 md:p-8 max-w-[1600px]">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
