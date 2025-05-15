
import { Place } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/place/${place.id}`);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    const { latitude, longitude } = place.location;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
    // Open in a new tab
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
    
    toast({
      title: "Opening Maps",
      description: `Viewing ${place.name} on Google Maps`
    });
  };

  return (
    <Card 
      className="place-card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="font-semibold bg-white text-travel-dark">
            {place.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{place.name}</h3>
          <span className="flex items-center text-travel-blue">
            <span className="text-sm font-semibold">★ {place.rating}</span>
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {place.description}
        </p>
        
        {place.distance && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Navigation className="h-4 w-4 mr-1 text-travel-accent" />
            <span>{place.distance} away</span>
          </div>
        )}
        
        <div 
          className="flex items-center text-sm text-travel-blue mt-2 hover:underline"
          onClick={handleMapClick}
        >
          <MapPin className="h-4 w-4 mr-1" />
          <span>View on Google Maps</span>
        </div>
      </CardContent>
    </Card>
  );
};
