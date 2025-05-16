
import { Place } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { PlaceCardImage } from "./PlaceCardImage";
import { PhotoModal } from "./PhotoModal";

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startImageIndex, setStartImageIndex] = useState(0);
  
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
  
  const openPhotoModal = (index: number) => {
    setStartImageIndex(index);
    setIsDialogOpen(true);
  };

  return (
    <Card 
      className="place-card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <div className="relative">
        <PlaceCardImage 
          images={place.images || []} 
          onOpenModal={openPhotoModal}
        />
        
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="font-semibold bg-white text-travel-dark">
            {place.category}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2 z-10">
          <Badge variant="secondary" className="font-semibold bg-white/80">
            {place.state}
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
        
        <div className="flex justify-between items-center mt-2">
          <div 
            className="flex items-center text-sm text-travel-blue hover:underline"
            onClick={handleMapClick}
          >
            <MapPin className="h-4 w-4 mr-1" />
            <span>View on Map</span>
          </div>
          
          {place.images && place.images.length > 0 && (
            <button
              className="flex items-center text-sm text-travel-blue hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                openPhotoModal(0);
              }}
            >
              <Image className="h-4 w-4 mr-1" />
              <span>Photos</span>
            </button>
          )}
        </div>
      </CardContent>

      <PhotoModal
        images={place.images || []}
        title={place.name}
        isOpen={isDialogOpen}
        initialIndex={startImageIndex}
        onClose={() => setIsDialogOpen(false)}
      />
    </Card>
  );
};
