
import { Place, Location } from "@/types";
import { calculateDistance, formatDistance } from "./locationService";
import { toast } from "@/components/ui/use-toast";

// Realistic data for famous places in India organized by state
const mockPlaces: Place[] = [
  {
    id: "1",
    name: "Kedarnath Temple",
    description: "One of the holiest Hindu temples dedicated to Lord Shiva, located in the Himalayan ranges. The temple is part of Char Dham pilgrimage circuit and is known for its spectacular mountain backdrop and spiritual significance.",
    imageUrl: "https://images.unsplash.com/photo-1621351183012-9e630a45c1a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1621351183012-9e630a45c1a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566376799975-ad0a084926fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600058644231-c99f79961de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 30.7352, longitude: 79.0669 },
    rating: 4.9,
    category: "Temple",
    features: ["Pilgrimage", "Trekking", "Mountain Views"],
    state: "Uttarakhand"
  },
  {
    id: "2",
    name: "Munnar Tea Gardens",
    description: "Lush green tea plantations nestled among the rolling hills of Kerala. Famous for its scenic beauty, mist-covered mountains, and vast expanse of tea estates that create a serene and picturesque landscape.",
    imageUrl: "https://images.unsplash.com/photo-1598604213913-9b878f6b9397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1598604213913-9b878f6b9397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599494922487-91d8d00d4c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523744187523-1809a2cecf8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 10.0889, longitude: 77.0595 },
    rating: 4.7,
    category: "Nature",
    features: ["Tea Plantations", "Hill Station", "Photography"],
    state: "Kerala"
  },
  {
    id: "3",
    name: "Valley of Flowers",
    description: "A UNESCO World Heritage Site in Uttarakhand known for its meadows of alpine flowers and outstanding natural beauty. The valley is home to rare and endangered flora and fauna and offers breathtaking trekking experiences.",
    imageUrl: "https://images.unsplash.com/photo-1592385518901-5b4845ab3e0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1592385518901-5b4845ab3e0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609766418204-547f9797fc68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 30.7283, longitude: 79.6073 },
    rating: 4.8,
    category: "Trekking",
    features: ["Alpine Flowers", "Hiking", "Wildlife"],
    state: "Uttarakhand"
  },
  {
    id: "4",
    name: "Meenakshi Amman Temple",
    description: "A historic Hindu temple located in Madurai, Tamil Nadu. Known for its stunning Dravidian architecture with thousands of colorful sculptures, towering gopurams (gateway towers), and intricate art that depicts ancient tales.",
    imageUrl: "https://images.unsplash.com/photo-1604171598147-e2f249d5d907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1604171598147-e2f249d5d907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1621397323368-8a5c7983d357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1573555657105-74c0c73208a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 9.9195, longitude: 78.1193 },
    rating: 4.8,
    category: "Temple",
    features: ["Architecture", "History", "Sculptures"],
    state: "Tamil Nadu"
  },
  {
    id: "5",
    name: "Alleppey Backwaters",
    description: "The network of lagoons, lakes, and canals in Kerala, often called the 'Venice of the East'. Famous for its houseboat cruises that offer a glimpse of village life along the serene backwaters surrounded by coconut trees.",
    imageUrl: "https://images.unsplash.com/photo-1578932017755-6f66fe010497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1578932017755-6f66fe010497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580289445498-a05eb71010df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 9.4981, longitude: 76.3388 },
    rating: 4.6,
    category: "Waterscape",
    features: ["Houseboats", "Backwaters", "Village Life"],
    state: "Kerala"
  },
  {
    id: "6",
    name: "Taj Mahal",
    description: "An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. Built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal, it is one of the world's most iconic monuments and a symbol of India's rich history.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 27.1751, longitude: 78.0421 },
    rating: 4.9,
    category: "Monument",
    features: ["Architecture", "History", "UNESCO Site"],
    state: "Uttar Pradesh"
  },
  {
    id: "7",
    name: "Goa Beaches",
    description: "Famous for its pristine beaches, nightlife, and laid-back coastal atmosphere. Goa's beaches range from popular spots with water sports and beach shacks to secluded stretches perfect for relaxation.",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577472153505-5a7df2d74c5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1528493448633-7ba8d62a5878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 15.2993, longitude: 74.1240 },
    rating: 4.6,
    category: "Beach",
    features: ["Beaches", "Nightlife", "Water Sports"],
    state: "Goa"
  },
  {
    id: "8",
    name: "Darjeeling Tea Estates",
    description: "Famous for its tea plantations and the spectacular view of Mount Kanchenjunga, the third highest peak in the world. The toy train, colonial architecture, and vibrant local culture make it a perfect hill station getaway.",
    imageUrl: "https://images.unsplash.com/photo-1544234605-161726706c1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1544234605-161726706c1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535535113570-834833933b9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1563775581598-5ab874490465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 27.0410, longitude: 88.2663 },
    rating: 4.7,
    category: "Hill Station",
    features: ["Tea Gardens", "Mountain Views", "Colonial Heritage"],
    state: "West Bengal"
  }
];

export const getNearbyPlaces = async (
  userLocation: Location | null,
  selectedState: string | null = null
): Promise<Place[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // Filter by state if selected
    let filteredPlaces = selectedState 
      ? mockPlaces.filter(place => place.state === selectedState)
      : mockPlaces;
    
    if (userLocation) {
      // Calculate distance from user and add to places
      filteredPlaces = filteredPlaces.map(place => {
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
    }
    
    return filteredPlaces;
  } catch (error) {
    console.error("Error fetching places:", error);
    toast({
      title: "Error",
      description: "Failed to fetch places",
      variant: "destructive"
    });
    return [];
  }
};

export const getPlaceById = async (id: string): Promise<Place | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlaces.find(place => place.id === id);
};

export const getPlaceCategories = (): string[] => {
  const categories = mockPlaces.map(place => place.category);
  return [...new Set(categories)];
};

export const getPlaceStates = (): string[] => {
  const states = mockPlaces.map(place => place.state);
  return [...new Set(states)];
};
