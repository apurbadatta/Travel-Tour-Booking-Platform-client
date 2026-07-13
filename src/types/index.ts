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
  images: string[];
  price: number;
  discountPrice?: number;
  duration: {
    days: number;
    nights: number;
  };
  maxGroupSize: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  ratings: {
    average: number;
    count: number;
  };
  destination: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    region?: string;
  };
  category: {
    _id: string;
    name: string;
    slug: string;
    icon?: string;
  };
  highlights: string[];
  included: string[];
  excluded: string[];
  departureLocation: string;
  startPoint: string;
  endPoint: string;
  isFeatured: boolean;
  isActive: boolean;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdBy: string | { _id: string; name: string; email: string; image?: string };
  createdAt: string;
  updatedAt: string;
}

// Pagination type
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Tour API response
export interface TourListResponse {
  tours: Tour[];
  pagination: Pagination;
}

// Navigation link type
export interface NavLink {
  label: string;
  href: string;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
}