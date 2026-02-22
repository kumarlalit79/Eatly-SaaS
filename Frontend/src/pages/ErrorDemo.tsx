import DashboardLayout from "@/components/layout/DashboardLayout";
import ErrorState from "@/components/states/ErrorState";
import {
  AlertCircle,
  FileWarning,
  ImageOff,
  ServerCrash,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ErrorDemo = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-20">
        <div className=" space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Error States Gallery
          </h1>
          <p className="text-gray-500">
            Visualizing the various error and empty states for the application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. Upload Error State */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              1. Upload Error (Invalid File)
            </h2>
            <ErrorState
              title="Unsupported file format"
              description="We only support JPG and PNG files. Please choose a valid image file to proceed."
              icon={<FileWarning className="w-10 h-10 text-red-500" />}
              actionLabel="Try Again"
              onAction={() => alert("Try Again Clicked")}
            />
          </div>

          {/* 2. OCR Failed State */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              2. OCR Failed (Unreadable)
            </h2>
            <ErrorState
              title="We couldn’t read this menu"
              description="The image might be blurry or too dark. Please make sure the text is clear and legible."
              icon={<ImageOff className="w-10 h-10 text-orange-500" />}
              actionLabel="Upload Clearer Photo"
              onAction={() => alert("Upload Clicked")}
            />
          </div>

          {/* 3. No Dishes Detected State */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              3. No Dishes Detected
            </h2>
            <ErrorState
              title="No menu items detected"
              description="We couldn't find any identifiable dish names in this photo. Try taking a closer shot of the menu text."
              icon={<AlertCircle className="w-10 h-10 text-yellow-500" />}
              actionLabel="Try Different Photo"
              onAction={() => alert("Try Different Photo Clicked")}
            />
          </div>

          {/* 4. Server Error State */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              4. Server Error
            </h2>
            <ErrorState
              title="Something went wrong"
              description="We encountered an issue while processing your request. Our team has been notified."
              icon={<ServerCrash className="w-10 h-10 text-red-600" />}
              actionLabel="Refresh Page"
              onAction={() => window.location.reload()}
            />
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ErrorDemo;
