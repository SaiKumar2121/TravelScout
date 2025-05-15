
import { useState } from "react";
import { ChevronLeft, ChevronRight, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

export const ImageGallery = ({ images, className }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  if (!images || images.length === 0) {
    return <div className="h-64 bg-muted flex items-center justify-center">No images</div>;
  }
  
  const handlePrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Main image */}
      <div className="relative h-72 md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              activeIndex === index ? "opacity-100" : "opacity-0"
            )}
          >
            {imageErrors[index] ? (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <Image className="h-16 w-16 text-muted-foreground/50" />
              </div>
            ) : (
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="h-full w-full object-cover"
                onError={() => handleImageError(index)}
              />
            )}
          </div>
        ))}
        
        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Thumbnail navigation */}
      <div className="flex overflow-x-auto gap-2 p-2 image-gallery">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "flex-shrink-0 w-16 h-16 overflow-hidden rounded transition-all",
              activeIndex === index ? "ring-2 ring-travel-blue" : "opacity-70"
            )}
          >
            {imageErrors[index] ? (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <Image className="h-6 w-6 text-muted-foreground/50" />
              </div>
            ) : (
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

