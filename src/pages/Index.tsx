
import { useState, useEffect } from "react";
import { getNearbyPlaces, getPlaceCategories } from "@/services/placesService";
import { Place, UserLocation } from "@/types";
import { LocationPermission } from "@/components/LocationPermission";
import { PlaceCard } from "@/components/PlaceCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { AppHeader } from "@/components/AppHeader";

const Index = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setFilteredPlaces(fetchedPlaces);
        
        // Extract unique categories
        const allCategories = getPlaceCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [userLocation]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = places.filter(place => place.category === selectedCategory);
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(places);
    }
  }, [selectedCategory, places]);

  const handleLocationUpdated = (location: UserLocation) => {
    setUserLocation(location);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container px-4 py-6">
        <LocationPermission onLocationUpdated={handleLocationUpdated} />
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Discover Places</h2>
          <p className="text-muted-foreground">
            Explore beautiful destinations near you
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-pulse space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-64 w-full bg-muted rounded-md" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}

        {filteredPlaces.length === 0 && !isLoading && (
          <div className="text-center my-12">
            <h3 className="text-xl font-semibold">No places found</h3>
            <p className="text-muted-foreground">
              Try changing your filter or expanding your search area
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
