import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Star, ShieldCheck, History, Sparkles } from "lucide-react";
import { useCreateCheckout, useSubscription } from "@/hooks/useSubscription";

const Upgrade = () => {
  const checkout = useCreateCheckout();
  const { data } = useSubscription();

  const plan = data?.data?.subscription?.plan;
  const isPro = plan === "PRO";

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      text: "Unlimited Menu Scans",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
      text: "Full Nutritional Breakdown",
    },
    {
      icon: <History className="w-5 h-5 text-blue-500" />,
      text: "Unlimited History Storage",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-green-500" />,
      text: "Ad-Free Experience",
    },
    {
      icon: <Star className="w-5 h-5 text-purple-500" />,
      text: "Priority Support",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 pt-8">
          <Badge
            variant="secondary"
            className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          >
            ✨ Upgrade to Pro
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Unlock unlimited menu scans <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              + full recommendations.
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Eat healthier without limits. Get detailed insights, save your
            history, and make better food choices every day.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="border-gray-200 shadow-sm relative overflow-hidden">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Free
              </CardTitle>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-extrabold text-gray-900">
                  $0
                </span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-500">For occasional diners.</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-gray-100">
                  <Check className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-gray-700">1 Menu Scan per day</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-gray-100">
                  <Check className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-gray-700">Basic Health Scores</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="p-1 rounded-full bg-gray-50">
                  <Check className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-gray-400">Limited History</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled={!isPro}>
                {isPro ? "Free Plan" : "Current Plan"}
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-indigo-200 shadow-xl relative overflow-hidden bg-white/50 backdrop-blur-sm">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <div className="absolute top-4 right-4 animate-bounce">
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none shadow-sm">
                Best Value
              </Badge>
            </div>

            <CardHeader className="text-center pb-2 pt-10">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Pro
              </CardTitle>
              <div className="mt-4 mb-2">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  $9.99
                </span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-indigo-600 font-medium">
                Everything you need to eat healthy.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-indigo-50">
                    <Check className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-800 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              {isPro ? (
                <Button
                  size="lg"
                  className="w-full"
                  variant="outline"
                  disabled
                >
                  You're on Pro! 🎉
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                  onClick={() => checkout.mutate()}
                  disabled={checkout.isPending}
                >
                  {checkout.isPending ? "Redirecting to Stripe..." : "Upgrade to Pro"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Trust Section */}
        <div className="text-center pt-10 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Secure payment powered by Stripe. Cancel anytime.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upgrade;