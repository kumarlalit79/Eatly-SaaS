import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "@/api/client";
import { useAuthStore } from "@/stores/authStore";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      navigate("/dashboard");
      return;
    }

    const verify = async () => {
      try {
        const res = await api.get(`/subscription/success?session_id=${sessionId}`);
        const subscription = res.data?.subscription;
        if (subscription) {
          useAuthStore.getState().setSubscription(subscription);
        }
        setStatus("success");
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch {
        setStatus("error");
        setTimeout(() => navigate("/dashboard"), 3000);
      }
    };

    verify();
  }, [sessionId, navigate]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            {status === "loading" && (
              <>
                <Loader2 className="w-10 h-10 mx-auto text-primary animate-spin" />
                <h2 className="text-xl font-bold">Verifying your payment...</h2>
                <p className="text-muted-foreground">Please wait while we confirm your subscription.</p>
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle2 className="w-10 h-10 mx-auto text-green-600" />
                <h2 className="text-xl font-bold text-green-700">Payment Successful!</h2>
                <p className="text-muted-foreground">Welcome to Pro! Redirecting to dashboard...</p>
              </>
            )}
            {status === "error" && (
              <>
                <h2 className="text-xl font-bold text-red-600">Verification Failed</h2>
                <p className="text-muted-foreground">Redirecting to dashboard...</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CheckoutSuccess;
