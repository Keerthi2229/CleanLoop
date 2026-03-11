export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role?: 'user' | 'admin';
}

export interface Booking {
  id: string;
  userId: string;
  wasteType: WasteType;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export type WasteType = 'organic' | 'recyclable' | 'electronic' | 'hazardous' | 'general';

export interface WasteCategory {
  type: WasteType;
  name: string;
  description: string;
  icon: string;
  color: string;
}
