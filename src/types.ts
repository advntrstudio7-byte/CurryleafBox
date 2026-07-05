export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'favorites' | 'breakfast' | 'mains' | 'sides' | 'drinks' | 'all';
  badge?: 'Bestseller' | "Chef's Special" | string;
  isVeg: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customInstructions?: string;
}

export interface Reservation {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  experienceType: 'standard' | 'sadya' | 'courtyard';
  specialRequests?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  dishName?: string;
  isVerified: boolean;
}
