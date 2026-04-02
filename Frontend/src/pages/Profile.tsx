import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  LogOut,
  User,
  Shield,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import {
  useCreateCheckout,
  useCreatePortal,
  useUsage,
} from "@/hooks/useSubscription";
import { useAuthStore } from "@/stores/authStore";

const Profile = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useProfile();
  const { data: usageRes } = useUsage();

  const checkout = useCreateCheckout();
  const portal = useCreatePortal();

  const logoutFn = useAuthStore((s) => s.logout);

  const user = data?.data?.user;
  const subscription = data?.data?.subscription;
  const usage = usageRes?.data;

  const isPro = subscription?.plan === "PRO";

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "";

  const handleLogout = () => {
    logoutFn();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Usage bar percentage (safe division)
  const usagePercent =
    usage && usage.scansLimit
      ? Math.min((usage.scansUsed / usage.scansLimit) * 100, 100)
      : 0;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Account Settings
        </h1>

        <div className="grid gap-8 md:grid-cols-3">
          {/* User Info Column */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 relative">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage
                      src={user?.avatarUrl || undefined}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {isPro && (
                    <div
                      className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm"
                      title="Pro User"
                    >
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <CardTitle>{user?.name || "User"}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>Member since {joinDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>
                    Account Status:{" "}
                    <span className="text-green-600 font-medium">Active</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Subscription Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">Subscription</CardTitle>
                    <CardDescription>
                      Manage your plan and billing details.
                    </CardDescription>
                  </div>
                  <Badge
                    variant={isPro ? "default" : "secondary"}
                    className={
                      isPro
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                        : ""
                    }
                  >
                    {isPro ? "Pro" : "Free"} Plan
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isPro ? (
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-indigo-900">
                        Next Renewal
                      </span>
                      <span className="text-sm text-indigo-700 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {subscription?.currentPeriodEnd
                          ? new Date(
                              subscription.currentPeriodEnd,
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-600">
                      You have access to all Pro features.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-3">
                    <p className="text-sm text-gray-600">
                      You are currently on the <strong>Free Plan</strong>.
                      Upgrade to unlock unlimited scans and detailed health
                      insights.
                    </p>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-yellow-500 h-full"
                        style={{ width: `${usagePercent}%` }}
                        title="Daily Limit Used"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-right">
                      Daily Limit: {usage?.scansUsed ?? 0}/
                      {usage?.scansLimit ?? 0} scans used
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="justify-end gap-3 pt-0">
                {isPro ? (
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => portal.mutate()}
                    disabled={portal.isPending}
                  >
                    <CreditCard className="w-4 h-4" />
                    {portal.isPending ? "Redirecting..." : "Manage Billing"}
                  </Button>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white gap-2 shadow-sm hover:shadow-md transition-all"
                    onClick={() => navigate("/upgrade")}
                  >
                    <Sparkles className="w-4 h-4" /> Upgrade to Pro
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-full">
                      <LogOut className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Log Out</p>
                      <p className="text-xs text-gray-500">
                        Sign out of your account on this device.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;