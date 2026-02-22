import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

const UploadMenuCard = () => {
  const navigate = useNavigate();
  return (
    <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-gradient-to-br from-white to-secondary/5 overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />

      <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-6 relative z-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
          <Camera className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-foreground">
            Upload a Menu Photo
          </h2>
          <p className="text-muted-foreground">
            Take a photo or upload an existing image of a menu to instantly
            translate and analyze it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button
            size="lg"
            className="w-full gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            onClick={() => navigate("/upload")}
          >
            <Camera className="w-4 h-4" />
            Scan Menu Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full gap-2"
            onClick={() => navigate("/upload")}
          >
            <Upload className="w-4 h-4" />
            Upload File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadMenuCard;
