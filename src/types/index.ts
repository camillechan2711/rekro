
export interface FilterOption {
  id: string;
  name: string;
  value: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  university: string;
  degree: string;
  year: number;
  bio: string;
  interests: string[];
  email?: string;
}

export interface Accommodation {
  id: number;
  title: string;
  description?: string;
  location: string;
  price: string;
  features?: string[];
  image: string;
  rating?: number;
  available?: boolean;
}

export interface University {
  id: string;
  name: string;
}

export interface Degree {
  id: string;
  name: string;
}
