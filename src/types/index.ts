
export interface Location {
  latitude: number;
  longitude: number;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  images: string[];
  location: Location;
  distance?: string;
  rating: number;
  category: string;
  features: string[];
}

export interface UserLocation {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}
