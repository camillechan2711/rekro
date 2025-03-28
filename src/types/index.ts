
export interface User {
  id: string;
  name: string;
  university: string;
  degree: string;
  year: number;
  bio: string;
  interests: string[];
  avatar: string;
}

export interface Accommodation {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  amenities: string[];
  images: string[];
  available: boolean;
  maxRoommates: number;
  currentTeamSize: number;
}

export type University = {
  id: string;
  name: string;
};

export type Degree = {
  id: string;
  name: string;
};

export type FilterOption = {
  id: string;
  label: string;
  value: string | number;
};
