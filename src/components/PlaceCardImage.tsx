
import { useState } from "react";
import { Image, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceCardImageProps {
  images: string[];
  onOpenModal: (index: number) => void;
}

export const PlaceCardImage = ({ images, onOpenModal }: PlaceCardImageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  
  const showPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setAutoPlayActive(false); // Pause autoplay when manually navigating
    if (images?.length > 1) {
      setCurrentImageIndex(prev => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setAutoPlayActive(false); // Pause autoplay when manually navigating
    if (images?.length > 1) {
      setCurrentImageIndex(prev => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const handleOpenPhotoModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onOpenModal(currentImageIndex);
  };
  
  // Auto-advance the images every 3 seconds if autoplay is active
  useState(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlayActive && images?.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => 
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 3000); // Change image every 3 seconds
    }
    
    return () => clearInterval(interval);
  });
  
  if (imageError || !images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-muted flex items-center justify-center">
        <Image className="h-12 w-12 text-muted-foreground/50" />
      </div>
    );
  }
  
  return (
    <div className="relative">
      <div className="w-full">
        <img
          src={images[currentImageIndex]}
          alt={`Place image ${currentImageIndex + 1}`}
          className="w-full h-48 object-cover"
          onError={() => setImageError(true)}
          onClick={handleOpenPhotoModal}
        />
      </div>
      
      {images.length > 1 && (
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
            {currentImageIndex + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
};
