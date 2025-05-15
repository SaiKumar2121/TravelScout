
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImageGallery } from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPlaceById } from "@/services/placesService";
import { Place } from "@/types";
import { MapPin, Navigation, ArrowLeft, Info } from "lucide-react";

const PlaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const placeData = await getPlaceById(id);
        if (placeData) {
          setPlace(placeData);
        } else {
          // Handle place not found
          console.error("Place not found");
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md animate-pulse space-y-4">
          <div className="h-64 w-full bg-muted rounded-md" />
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-24 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Place Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the place you're looking for.
        </p>
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <ImageGallery images={place.images} />
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-4 left-4 bg-white/70 backdrop-blur-sm hover:bg-white/90"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="container px-4 py-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="font-bold text-2xl">{place.name}</h1>
          <Badge variant="outline" className="text-travel-blue border-travel-blue">
            {place.category}
          </Badge>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {place.location.latitude.toFixed(2)}, {place.location.longitude.toFixed(2)}
          </span>
          {place.distance && (
            <>
              <span className="mx-2">•</span>
              <Navigation className="h-4 w-4 mr-1" />
              <span>{place.distance} away</span>
            </>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-lg font-semibold mr-2">★ {place.rating}</span>
            <span className="text-sm text-muted-foreground">Excellent place</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2 text-travel-blue" />
            About this place
          </h2>
          <p className="text-muted-foreground">{place.description}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">Features</h2>
          <div className="flex flex-wrap gap-2">
            {place.features.map((feature, index) => (
              <Badge key={index} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <Button className="w-full bg-travel-blue hover:bg-travel-blue/90">
            View on Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
