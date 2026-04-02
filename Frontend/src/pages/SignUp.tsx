import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"; // Assuming Input exists, if not will use standard input
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useSignup, useGoogleAuth } from "@/hooks/useAuth";
import { signInWithGoogle } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Google Logo SVG component
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 4.63c1.61 0 3.06.56 4.21 1.64l3.16-3.16C17.45 1.18 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const SignUp = () => {
  const navigate = useNavigate();

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const signupMutation = useSignup();
  const googleMutation = useGoogleAuth();

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your email to get started"
    >
      <div className="grid gap-6">
        <Button
          variant="outline"
          className="w-full h-11 bg-background"
          type="button"
          onClick={async () => {
            try {
              const idToken = await signInWithGoogle();
  
              googleMutation.mutate(
                { idToken },
                {
                  onSuccess: (res: any) => {
                    const user = res.data.user;
                    if (!user.isOnboarded) {
                      navigate("/onboarding");
                    } else {
                      navigate("/dashboard");
                    }
                  },
                  onError: (err: any) => {
                    toast({
                      title: "Google Signup Failed",
                      description: err.response?.data?.error || "Failed to link with backend",
                      variant: "destructive",
                    });
                  }
                },
              );
            } catch (err: any) {
              console.error(err);
              toast({
                title: "Google Error",
                description: err.message,
                variant: "destructive",
              });
            }
          }}
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        {!showEmailForm && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              className="w-full h-11"
              type="button"
              onClick={() => setShowEmailForm(true)}
            >
              <Mail className="w-4 h-4 mr-2" />
              Continue with Email
            </Button>
          </>
        )}

        {showEmailForm && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signupMutation.mutate(
                { name, email, password },
                {
                  onSuccess: () => navigate("/onboarding"),
                  onError: (err: any) => {
                    toast({
                      title: "Signup Failed",
                      description: err.response?.data?.error || "Error creating account",
                      variant: "destructive",
                    });
                  }
                },
              );
            }}
            className="grid gap-4"
          >
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={signupMutation.isPending}>
              {signupMutation.isPending ? "Creating..." : "Create Account"}
            </Button>
          </form>
        )}

        <p className="text-xs text-center text-muted-foreground">
          We don’t store your card unless you upgrade.
        </p>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
