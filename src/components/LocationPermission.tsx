
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { UserLocation } from "@/types";
import { getCurrentLocation } from "@/services/locationService";

interface LocationPermissionProps {
  onLocationUpdated: (location: UserLocation) => void;
}

export const LocationPermission = ({ onLocationUpdated }: LocationPermissionProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    setStatus("loading");
    setError(null);
    
    try {
      const location = await getCurrentLocation();
      if (location.error) {
        setError(location.error);
        setStatus("error");
      } else {
        onLocationUpdated(location);
        setStatus("success");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setStatus("error");
      console.error("Location error:", err);
    }
  };

  useEffect(() => {
    // Automatically request location when component mounts
    requestLocation();
  }, []);

  if (status === "success") {
    return null;
  }

  return (
    <Card className="mb-6 border-2 border-travel-light animate-fade-in">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <MapPin className="text-travel-blue h-8 w-8 mb-2" />
        <h2 className="text-xl font-semibold mb-1">Enable Location</h2>
        <p className="text-muted-foreground mb-4">
          Allow access to your location to discover amazing places nearby
        </p>
        
        {status === "error" && error && (
          <div className="text-destructive mb-4 text-sm">
            {error}
          </div>
        )}
        
        <Button 
          onClick={requestLocation} 
          disabled={status === "loading"}
          className="bg-travel-blue hover:bg-travel-blue/90"
        >
          {status === "loading" ? "Detecting location..." : "Allow Location Access"}
        </Button>
      </CardContent>
    </Card>
  );
};
