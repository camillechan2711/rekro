
import { User, Accommodation, University, Degree } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    university: 'Cambridge University',
    degree: 'Computer Science',
    year: 2,
    bio: 'Tech enthusiast and coffee lover. Looking for like-minded students to collaborate on projects.',
    interests: ['Programming', 'AI', 'Gaming'],
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Taylor Smith',
    university: 'Oxford University',
    degree: 'Business Administration',
    year: 3,
    bio: 'Aspiring entrepreneur with a passion for sustainable business models.',
    interests: ['Startups', 'Marketing', 'Sustainability'],
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Jordan Lee',
    university: 'Imperial College London',
    degree: 'Mechanical Engineering',
    year: 2,
    bio: 'Engineering student with a love for robotics and product design.',
    interests: ['Robotics', 'Design', 'Football'],
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'Morgan Chen',
    university: 'University College London',
    degree: 'Psychology',
    year: 1,
    bio: 'First-year psychology student interested in cognitive development.',
    interests: ['Research', 'Art', 'Reading'],
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: '5',
    name: 'Reese Williams',
    university: 'Cambridge University',
    degree: 'Computer Science',
    year: 2,
    bio: 'Software developer and open-source contributor.',
    interests: ['Open Source', 'Web Development', 'Music'],
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
];

export const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    title: 'Modern Student Apartment',
    address: '123 University Ave, Cambridge',
    price: 650,
    bedrooms: 3,
    bathrooms: 2,
    description: 'Bright and spacious apartment close to campus. Perfect for group of students.',
    amenities: ['WiFi', 'Washing Machine', 'Study Area', 'Bike Storage'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3'
    ],
    available: true,
    maxRoommates: 3,
    currentTeamSize: 0
  },
  {
    id: '2',
    title: 'Cozy Studio near Campus',
    address: '45 College Road, Oxford',
    price: 550,
    bedrooms: 1,
    bathrooms: 1,
    description: 'Perfect studio for individual students. Walking distance to main campus buildings.',
    amenities: ['WiFi', 'Kitchenette', 'Gym Access', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1595526051245-4506e0005bd0?ixlib=rb-4.0.3'
    ],
    available: true,
    maxRoommates: 1,
    currentTeamSize: 0
  },
  {
    id: '3',
    title: 'Shared Student House',
    address: '78 High Street, London',
    price: 500,
    bedrooms: 5,
    bathrooms: 3,
    description: 'Large house with a community feel. Great for socializing and making new friends.',
    amenities: ['Garden', 'WiFi', 'Communal Kitchen', 'Laundry Room'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3'
    ],
    available: true,
    maxRoommates: 5,
    currentTeamSize: 2
  },
  {
    id: '4',
    title: 'Luxury Student Apartment',
    address: '10 Riverside Drive, Cambridge',
    price: 800,
    bedrooms: 2,
    bathrooms: 2,
    description: 'High-end apartment with premium finishes and amenities.',
    amenities: ['WiFi', 'En-suite Bathrooms', 'Study Room', 'Balcony', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1587099063419-c9435c2b9414?ixlib=rb-4.0.3'
    ],
    available: true,
    maxRoommates: 2,
    currentTeamSize: 0
  },
  {
    id: '5',
    title: 'Budget Friendly Dorm',
    address: '55 Student Lane, London',
    price: 350,
    bedrooms: 1,
    bathrooms: 1,
    description: 'Affordable dorm-style accommodation with good amenities.',
    amenities: ['WiFi', 'Shared Kitchen', 'Study Area', 'Laundry'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-4.0.3'
    ],
    available: true,
    maxRoommates: 1,
    currentTeamSize: 0
  },
];

export const universities: University[] = [
  { id: '1', name: 'Cambridge University' },
  { id: '2', name: 'Oxford University' },
  { id: '3', name: 'Imperial College London' },
  { id: '4', name: 'University College London' },
  { id: '5', name: 'London School of Economics' },
];

export const degrees: Degree[] = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Business Administration' },
  { id: '3', name: 'Mechanical Engineering' },
  { id: '4', name: 'Psychology' },
  { id: '5', name: 'Medicine' },
];

export const priceRanges: FilterOption[] = [
  { id: '1', label: 'Under £400', value: 400 },
  { id: '2', label: '£400 - £600', value: 600 },
  { id: '3', label: '£600 - £800', value: 800 },
  { id: '4', label: 'Over £800', value: 1000 },
];

export const bedroomOptions: FilterOption[] = [
  { id: '1', label: 'Studio', value: 1 },
  { id: '2', label: '1 Bedroom', value: 1 },
  { id: '3', label: '2 Bedrooms', value: 2 },
  { id: '4', label: '3+ Bedrooms', value: 3 },
];

export const amenityOptions: FilterOption[] = [
  { id: '1', label: 'WiFi', value: 'WiFi' },
  { id: '2', label: 'Washing Machine', value: 'Washing Machine' },
  { id: '3', label: 'Study Area', value: 'Study Area' },
  { id: '4', label: 'Gym', value: 'Gym' },
  { id: '5', label: 'Garden', value: 'Garden' },
];

export const currentUser: User = {
  id: '0',
  name: 'Sam Taylor',
  university: 'Cambridge University',
  degree: 'Computer Science',
  year: 2,
  bio: 'Computer Science student passionate about web development and artificial intelligence.',
  interests: ['Coding', 'AI', 'Music', 'Basketball'],
  avatar: 'https://i.pravatar.cc/150?img=12'
};
