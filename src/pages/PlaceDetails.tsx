import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPlaceById } from "@/services/placesService";
import { Place } from "@/types";
import { MapPin, Navigation, ArrowLeft, Info } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { PhotoModal } from "@/components/PhotoModal";
import "../App.css";

interface WeatherInfo {
  temperature: string;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
}

const PlaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [initialPhotoIndex, setInitialPhotoIndex] = useState(0);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const weatherCache = useRef<{ [key: string]: WeatherInfo }>({});

  const fetchWeather = async (lat: number, lon: number): Promise<WeatherInfo | null> => {
    const cacheKey = `${lat},${lon}`;
    if (weatherCache.current[cacheKey]) {
      return weatherCache.current[cacheKey];
    }

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    if (!API_KEY) {
      console.error("Weather API Key is missing");
      return null;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      const weatherData: WeatherInfo = {
        temperature: `${data.main.temp}°C`,
        condition: data.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      };

      weatherCache.current[cacheKey] = weatherData;
      return weatherData;
    } catch (err) {
      console.error("Failed to fetch weather:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchPlace = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const placeData = await getPlaceById(id);
        if (placeData) {
          setPlace(placeData);

          const weatherData = await fetchWeather(
            placeData.location.latitude,
            placeData.location.longitude
          );
          setWeather(weatherData);
        } else {
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

  const handleOpenGoogleMaps = () => {
    if (!place) return;

    const { latitude, longitude } = place.location;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");

    toast({
      title: "Opening Maps",
      description: `Viewing ${place.name} on Google Maps`,
    });
  };

  const openPhotoModal = (index: number) => {
    setInitialPhotoIndex(index);
    setPhotoModalOpen(true);
  };

  const scrollGallery = (direction: "left" | "right") => {
    const container = document.getElementById("photo-scroll-container");
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
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
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 left-4 z-10 bg-white/70 backdrop-blur-sm hover:bg-white/90"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="pt-16 pb-4 px-4 bg-travel-blue/10 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center text-sm">
            {weather && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img src={weather.icon} alt="weather" className="w-5 h-5" />
              <span>{weather.temperature}</span>
              <span>({weather.condition})</span>
              <span>• Humidity: {weather.humidity}%</span>
              <span>• Wind: {weather.wind} m/s</span>
            </div>
          )}
            {place.distance && (
              <>
                <span className="mx-2">•</span>
                <Navigation className="h-4 w-4 mr-1" />
                <span>{place.distance} away</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container px-4 py-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="font-bold text-2xl">{place.name}</h1>
          <Badge variant="outline" className="text-travel-blue border-travel-blue">
            {place.category}
          </Badge>
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
        
        {/* Photo grid section */}
        {place.images && place.images.length > 0 && (
        <div className="mb-6">
         <h2 className="font-semibold text-lg mb-3 text-left">Photos</h2>

    {/* Desktop: Horizontal scroll view */}
    <div className="hidden md:block relative">
      <button
        onClick={() => scrollGallery("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white px-2 py-1 shadow rounded-l"
      >
        &#60;
      </button>

      <div
        id="photo-scroll-container"
        className="flex overflow-x-auto no-scrollbar space-x-2 snap-x snap-mandatory scroll-smooth"
      >
        {place.images.map((image, index) => (
          <div
            key={index}
            className="min-w-[220px] h-[220px] flex-shrink-0 rounded-md overflow-hidden cursor-pointer snap-start"
            onClick={() => openPhotoModal(index)}
          >
            <img
              src={image}
              alt={`${place.name} - Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollGallery("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white px-2 py-1 shadow rounded-r"
      >
        &#62;
      </button>
    </div>

    {/* Mobile: Grid view */}
    <div className="grid grid-cols-3 gap-2 md:hidden">
      {place.images.slice(0, 6).map((image, index) => (
        <div
          key={index}
          className="aspect-square rounded-md overflow-hidden cursor-pointer"
          onClick={() => openPhotoModal(index)}
        >
          <img
            src={image}
            alt={`${place.name} - Photo ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {place.images.length > 6 && (
        <div
          className="aspect-square rounded-md overflow-hidden bg-black/50 flex items-center justify-center cursor-pointer"
          onClick={() => openPhotoModal(6)}
        >
          <span className="text-white font-medium">+{place.images.length - 6}</span>
        </div>
      )}
    </div>
  </div>
)}

        
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 text-left">Features</h2>
          <div className="flex flex-wrap gap-2">
            {place.features.map((feature, index) => (
              <Badge key={index} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {place.openingMonths && place.bestTimeToVisit && (
  <div className="mb-6 text-left">
    <h2 className="font-semibold text-lg mb-3 text-left">Timings</h2>

    <div className="text-muted-foreground mb-2">
      <p><strong>Opening Months:</strong> {place.openingMonths.from} to {place.openingMonths.to}</p>
      <p>
        <strong>Best Time to Visit:</strong> {place.bestTimeToVisit.from} to {place.bestTimeToVisit.to}
        <Button
          size="sm"
          variant="ghost"
          className="ml-2 text-sm text-blue-600 hover:underline"
          onClick={() => toast({
            title: "Coming soon",
            description: "AI-based explanation for best time to visit will be available soon!"
          })}
        >
          Why?
        </Button>
      </p>
    </div>
  </div>
)}

        
        <div className="mt-8">
          <Button className="w-full bg-travel-blue hover:bg-travel-blue/90" onClick={handleOpenGoogleMaps}>
            <MapPin className="h-5 w-5 mr-2" /> View on Google Maps
          </Button>
        </div>
      </div>

      <PhotoModal
        images={place.images || []}
        title={place.name}
        isOpen={photoModalOpen}
        initialIndex={initialPhotoIndex}
        onClose={() => setPhotoModalOpen(false)}
      />
    </div>
  );
};

export default PlaceDetails;
