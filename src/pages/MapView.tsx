
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getNearbyPlaces } from "@/services/placesService";
import { UserLocation, Place } from "@/types";
import { ArrowLeft } from "lucide-react";

const MapView = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserLocation({
            latitude: null,
            longitude: null,
            error: "Unable to retrieve your location"
          });
          setIsLoading(false);
        }
      );
    } else {
      setUserLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser"
      });
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        let location = null;
        if (userLocation && userLocation.latitude && userLocation.longitude) {
          location = {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          };
        }
        
        const fetchedPlaces = await getNearbyPlaces(location);
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userLocation) {
      fetchPlaces();
    }
  }, [userLocation]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="p-4 absolute top-0 left-0 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white/70 backdrop-blur-sm hover:bg-white/90"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Placeholder for map - in a real app, this would be an actual map component */}
      <div className="h-screen w-full flex items-center justify-center bg-travel-light/30">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold mb-2">Map View</h2>
          <p className="text-muted-foreground mb-4">
            {isLoading 
              ? "Loading map..." 
              : userLocation?.error 
                ? userLocation.error 
                : `Displaying ${places.length} places near your location`}
          </p>
          <p className="text-sm text-travel-accent">
            Note: This is a placeholder for the map. In a real app, this would display
            an interactive map showing all nearby places.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapView;
