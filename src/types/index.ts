// User type from better-auth
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Session type from better-auth
export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
}

// Auth response from better-auth
export interface AuthResponse {
  user: User;
  session: Session;
}

// API response format
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// Tour type
export interface Tour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  duration: {
    days: number;
    nights: number;
  };
  maxGroupSize: number;
  ratings: {
    average: number;
    count: number;
  };
  destination: {
    _id: string;
    name: string;
    slug: string;
  };
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  isFeatured: boolean;
  isActive: boolean;
}

// Navigation link type
export interface NavLink {
  label: string;
  href: string;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
}