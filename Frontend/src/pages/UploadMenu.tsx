import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, Loader2, ScanLine } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCreateScan } from "@/hooks/useScans";

const UploadMenu = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload a valid image file (JPG, PNG)");
      return;
    }

    // cleanup previous preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createScan = useCreateScan();

  const handleScan = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    if (restaurantName) formData.append("restaurantName", restaurantName);
    createScan.mutate(formData);
  };

  useEffect(() => {
    if (createScan.isError) {
      const msg = (createScan.error as any)?.response?.data?.message;
      toast.error(msg || "Failed to upload menu");
    }
  }, [createScan.isError]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Upload Menu
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload a clear photo of the menu to start the AI analysis.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Upload Area */}
          <Card
            className={cn(
              "border-2 border-dashed transition-all duration-300 overflow-hidden",
              isDragging
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-gray-200 hover:border-primary/50",
              previewUrl ? "border-solid" : "",
            )}
          >
            <CardContent className="p-0">
              {!previewUrl ? (
                <div
                  className="flex flex-col items-center justify-center p-12 text-center cursor-pointer min-h-[400px]"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                >
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-bounce-slow">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isDragging
                      ? "Drop image here"
                      : "Click to upload or drag and drop"}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    Supports JPG, PNG. High resolution images work best for text
                    recognition.
                  </p>
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="Menu Preview"
                    className="w-full h-auto max-h-[600px] object-contain bg-gray-50"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    <Button variant="secondary" onClick={triggerFileInput}>
                      Replace Image
                    </Button>
                    <Button variant="destructive" onClick={handleRemoveFile}>
                      Remove
                    </Button>
                  </div>
                  {/* Hidden input for replace functionality */}
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Details & Actions */}
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="restaurantName" className="text-base">
                Restaurant Name{" "}
                <span className="text-muted-foreground font-normal">
                  (Optional)
                </span>
              </Label>
              <Input
                id="restaurantName"
                placeholder="e.g. The Burger Joint"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="h-12 text-lg"
              />
              <p className="text-sm text-muted-foreground">
                Adding a name helps organize your scan history.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 text-lg h-12 gap-2 shadow-lg hover:shadow-xl transition-all"
                onClick={handleScan}
                disabled={!file || createScan.isPending}
              >
                {createScan.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Scanning Menu...
                  </>
                ) : (
                  <>
                    <ScanLine className="w-5 h-5" />
                    Scan Menu
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 text-lg h-12"
                onClick={() => navigate(-1)}
                disabled={createScan.isPending}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadMenu;
