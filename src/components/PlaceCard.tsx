
import { Place } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Image, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  
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

  const showPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setAutoPlayActive(false); // Pause autoplay when manually navigating
    if (place.images?.length > 1) {
      setCurrentImageIndex(prev => 
        prev === 0 ? place.images.length - 1 : prev - 1
      );
    }
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setAutoPlayActive(false); // Pause autoplay when manually navigating
    if (place.images?.length > 1) {
      setCurrentImageIndex(prev => 
        prev === place.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const openPhotoModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setModalImageIndex(currentImageIndex);
    setIsDialogOpen(true);
    setAutoPlayActive(true); // Start autoplay in the modal
  };

  const handleModalPrevious = () => {
    setAutoPlayActive(false); // Pause autoplay when manually navigating
    if (place.images?.length > 1) {
      setModalImageIndex(prev => 
        prev === 0 ? place.images.length - 1 : prev - 1
      );
    }
  };

  const handleModalNext = () => {
    setAutoPlayActive(false); // Pause autoplay when manually navigating
    if (place.images?.length > 1) {
      setModalImageIndex(prev => 
        prev === place.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  // Auto-advance the images every 3 seconds if autoplay is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlayActive && place.images?.length > 1) {
      interval = setInterval(() => {
        if (!isDialogOpen) {
          setCurrentImageIndex(prev => 
            prev === place.images.length - 1 ? 0 : prev + 1
          );
        } else {
          setModalImageIndex(prev => 
            prev === place.images.length - 1 ? 0 : prev + 1
          );
        }
      }, 3000); // Change image every 3 seconds
    }
    
    return () => clearInterval(interval);
  }, [autoPlayActive, place.images, isDialogOpen]);

  return (
    <Card 
      className="place-card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <div className="relative">
        {imageError || !place.images || place.images.length === 0 ? (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <Image className="h-12 w-12 text-muted-foreground/50" />
          </div>
        ) : (
          <div className="relative">
            <div className="w-full">
              <img
                src={place.images[currentImageIndex]}
                alt={`${place.name} - image ${currentImageIndex + 1}`}
                className="w-full h-48 object-cover"
                onError={() => setImageError(true)}
                onClick={openPhotoModal}
              />
            </div>
            {place.images.length > 1 && (
              <>
                <button
                  onClick={showPreviousImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={showNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded-md z-10">
                  {currentImageIndex + 1}/{place.images.length}
                </div>
              </>
            )}
          </div>
        )}
        
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
              onClick={openPhotoModal}
            >
              <Image className="h-4 w-4 mr-1" />
              <span>Photos</span>
            </button>
          )}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="p-4">
            <DialogTitle>{place.name} - Photos</DialogTitle>
            <DialogDescription>Browse through all available photos</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <div className="relative h-[60vh]">
              {place.images && place.images.length > 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={place.images[modalImageIndex]}
                    alt={`${place.name} - Photo ${modalImageIndex + 1}`}
                    className="max-h-[60vh] max-w-full object-contain"
                  />
                  {place.images.length > 1 && (
                    <>
                      <button
                        onClick={handleModalPrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={handleModalNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <Image className="h-16 w-16 text-muted-foreground/50" />
                </div>
              )}
            </div>
            
            <div className="bg-background p-4">
              <div className="text-center text-sm">
                {modalImageIndex + 1}/{place.images?.length || 0}
              </div>
              
              {place.images && place.images.length > 1 && (
                <div className="flex overflow-x-auto gap-2 mt-2 pt-2 pb-4">
                  {place.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setModalImageIndex(index);
                        setAutoPlayActive(false);
                      }}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 overflow-hidden rounded transition-all",
                        modalImageIndex === index ? "ring-2 ring-travel-blue" : "opacity-70"
                      )}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
