
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getNearbyPlaces } from "@/services/placesService";
import { UserLocation, Place } from "@/types";
import { ArrowLeft, MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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

  const openGoogleMaps = () => {
    if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
      toast({
        title: "Error",
        description: "Your location is not available",
        variant: "destructive",
      });
      return;
    }
    
    const { latitude, longitude } = userLocation;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
    toast({
      title: "Opening Maps",
      description: "Viewing your current location on Google Maps"
    });
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
      
      <div className="h-screen w-full flex flex-col items-center justify-center bg-travel-light/30">
        <div className="text-center p-4 max-w-md bg-white/90 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Map View</h2>
          <p className="text-muted-foreground mb-4">
            {isLoading 
              ? "Loading map..." 
              : userLocation?.error 
                ? userLocation.error 
                : `Found ${places.length} places near your location`}
          </p>
          
          <div className="mb-6">
            {userLocation && !userLocation.error && (
              <p className="text-sm font-medium">
                Your coordinates: {userLocation.latitude?.toFixed(4)}, {userLocation.longitude?.toFixed(4)}
              </p>
            )}
          </div>
          
          <Button 
            onClick={openGoogleMaps}
            disabled={!userLocation || !userLocation.latitude}
            className="w-full bg-travel-blue hover:bg-travel-blue/90 mb-4"
          >
            <MapPin className="h-5 w-5 mr-2" /> Open in Google Maps
          </Button>
          
          <p className="text-sm text-travel-accent">
            Note: This is a simplified map view. In a full implementation, 
            we would integrate with a maps API to display an interactive map.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapView;
