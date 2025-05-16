
import { useState, useEffect } from "react";
import { Image, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PhotoModalProps {
  images: string[];
  title: string;
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

export const PhotoModal = ({ 
  images, 
  title, 
  isOpen, 
  initialIndex = 0,
  onClose 
}: PhotoModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  
  // Update the current index when the initialIndex prop changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);
  
  const handlePrevious = () => {
    setAutoPlayActive(false); // Pause autoplay when manually navigating
    if (images?.length > 1) {
      setCurrentIndex(prev => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };
  
  const handleNext = () => {
    setAutoPlayActive(false); // Pause autoplay when manually navigating
    if (images?.length > 1) {
      setCurrentIndex(prev => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  // Auto-advance the images every 3 seconds if autoplay is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isOpen && autoPlayActive && images?.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex(prev => 
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 3000); // Change image every 3 seconds
    }
    
    return () => clearInterval(interval);
  }, [autoPlayActive, images, isOpen]);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-4">
          <DialogTitle>{title} - Photos</DialogTitle>
          <DialogDescription>Browse through all available photos</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <div className="relative h-[60vh]">
            {images && images.length > 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={images[currentIndex]}
                  alt={`${title} - Photo ${currentIndex + 1}`}
                  className="max-h-[60vh] max-w-full object-contain"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNext}
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
              {currentIndex + 1}/{images?.length || 0}
            </div>
            
            {images && images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setAutoPlayActive(false);
                    }}
                    className={cn(
                      "aspect-square overflow-hidden rounded transition-all",
                      currentIndex === index ? "ring-2 ring-travel-blue" : "opacity-70"
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
  );
};
