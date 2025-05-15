
import { useState, useEffect } from "react";
import { getNearbyPlaces, getPlaceCategories, getPlaceStates } from "@/services/placesService";
import { Place } from "@/types";
import { PlaceCard } from "@/components/PlaceCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { StateFilter } from "@/components/StateFilter";
import { AppHeader } from "@/components/AppHeader";

const Index = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const fetchedPlaces = await getNearbyPlaces(selectedState);
        setPlaces(fetchedPlaces);
        
        // Extract unique categories and states
        const allCategories = getPlaceCategories();
        setCategories(allCategories);
        
        const allStates = getPlaceStates();
        setStates(allStates);
        
        // Apply category filter if needed
        if (selectedCategory) {
          setFilteredPlaces(fetchedPlaces.filter(place => place.category === selectedCategory));
        } else {
          setFilteredPlaces(fetchedPlaces);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [selectedState]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = places.filter(place => place.category === selectedCategory);
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(places);
    }
  }, [selectedCategory, places]);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Discover Places</h2>
          <p className="text-muted-foreground">
            Explore beautiful destinations {selectedState ? `in ${selectedState}` : "across India"}
          </p>
        </div>

        <StateFilter 
          states={states}
          selectedState={selectedState}
          onSelectState={setSelectedState}
        />

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
              Try changing your filter or selecting a different state
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
