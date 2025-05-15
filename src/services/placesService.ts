
import { Place, Location } from "@/types";
import { calculateDistance, formatDistance } from "./locationService";

// Mock data for nearby places
const mockPlaces: Place[] = [
  {
    id: "1",
    name: "Azure Mountain Lake",
    description: "A stunning alpine lake surrounded by majestic mountains. Perfect for hiking, photography, and connecting with nature. The crystal clear waters reflect the surrounding peaks for a truly magical experience.",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
    ],
    location: { latitude: 47.6062, longitude: -122.3321 },
    rating: 4.8,
    category: "Nature",
    features: ["Hiking", "Photography", "Swimming"]
  },
  {
    id: "2",
    name: "Mystic Forest Trail",
    description: "Wander through enchanting woods with ancient trees and magical atmosphere. The sunlight filters through the dense canopy creating a mystical ambiance that's perfect for nature lovers and adventure seekers.",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    images: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff"
    ],
    location: { latitude: 47.6092, longitude: -122.3350 },
    rating: 4.6,
    category: "Nature",
    features: ["Walking", "Wildlife", "Photography"]
  },
  {
    id: "3",
    name: "Coastal Cliffs View",
    description: "Dramatic cliffs overlooking the vast ocean with breathtaking sunset views. The crashing waves against the rocky shoreline create a symphony of natural sounds that soothe the soul.",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed"
    ],
    location: { latitude: 47.6032, longitude: -122.3300 },
    rating: 4.9,
    category: "Coastal",
    features: ["Views", "Sunset", "Walking"]
  },
  {
    id: "4",
    name: "Historic City Center",
    description: "Explore the charming streets filled with history, architecture, and local culture. The cobblestone pathways lead to hidden gems, local artisan shops, and cafes serving authentic cuisine.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67"
    ],
    location: { latitude: 47.6050, longitude: -122.3344 },
    rating: 4.5,
    category: "Urban",
    features: ["History", "Food", "Shopping"]
  }
];

export const getNearbyPlaces = async (
  userLocation: Location | null
): Promise<Place[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!userLocation) {
    return mockPlaces;
  }

  // Calculate distance from user and sort by proximity
  return mockPlaces
    .map(place => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        place.location.latitude,
        place.location.longitude
      );
      
      return {
        ...place,
        distance: formatDistance(distance)
      };
    })
    .sort((a, b) => {
      const distA = parseFloat((a.distance || "").replace(" km", "").replace(" m", ""));
      const distB = parseFloat((b.distance || "").replace(" km", "").replace(" m", ""));
      return distA - distB;
    });
};

export const getPlaceById = async (id: string): Promise<Place | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlaces.find(place => place.id === id);
};

export const getPlaceCategories = (): string[] => {
  const categories = mockPlaces.map(place => place.category);
  return [...new Set(categories)];
};
