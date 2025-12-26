import {
  UserStatus,
  UserPhase,
  UserObjective,
  AccommodationType,
  PartnerType,
  ReviewTargetType,
  LeadType,
  UserRole,
  LeadStatus,
  ConfidenceLevel,
  CopilotSource,
  LeadSource,
} from './enums.js';

// Base entity types (matching Prisma models)
export interface User {
  id: string;
  email: string;
  name?: string;
  bio?: string;
  role?: UserRole;
  badge?: string;
  reputationScore?: number;
  isActive: boolean;

  // Onboarding
  originCountry?: string;
  originCity?: string;
  destinationCity?: string;
  status?: UserStatus;
  phase?: UserPhase;
  objective?: UserObjective;

  createdAt: Date;
  updatedAt: Date;
}

export interface Partner {
  id: string;
  type: PartnerType;
  name: string;
  contactEmail?: string;
  whatsapp?: string;
  website?: string;
  payoutModel?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Accommodation {
  id: string;
  active: boolean;
  type: AccommodationType;
  title: string;
  city: string;
  priceCad: number;
  currency: string;
  lat?: number;
  lng?: number;
  addressHint?: string;
  rules?: string;
  description?: string;
  partnerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  active: boolean;
  schoolName: string;
  programName: string;
  programType?: string;
  city: string;
  weeklyHours?: number;
  durationWeeks?: number;
  priceCad?: number;
  currency: string;
  visaType?: string;
  rules?: string;
  description?: string;
  partnerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  targetType: ReviewTargetType;
  accommodationId?: string;
  courseId?: string;
  ratingSafety?: number;
  ratingLocation?: number;
  ratingExperience?: number;
  comment?: string;
  createdAt: Date;
}

export interface Lead {
  id: string;
  userId?: string;
  type: LeadType;
  accommodationId?: string;
  courseId?: string;
  partnerId?: string;
  name: string;
  email: string;
  message?: string;
  source?: LeadSource;
  status?: LeadStatus;
  createdAt: Date;
}

export interface CopilotSession {
  id: string;
  userId?: string;
  question: string;
  response: string;
  recommendedAccommodationIds: string[];
  recommendedCourseIds: string[];
  modelName?: string;
  latencyMs?: number;
  source?: CopilotSource;
  confidence?: ConfidenceLevel;
  warnings: string[];
  createdAt: Date;
}

// Extended types with relations
export interface UserWithRelations extends User {
  reviews?: Review[];
  leads?: Lead[];
  copilotSessions?: CopilotSession[];
}

export interface AccommodationWithRelations extends Accommodation {
  partner?: Partner;
  reviews?: Review[];
  leads?: Lead[];
}

export interface CourseWithRelations extends Course {
  partner?: Partner;
  reviews?: Review[];
  leads?: Lead[];
}

export interface PartnerWithRelations extends Partner {
  accommodations?: Accommodation[];
  courses?: Course[];
  leads?: Lead[];
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Search and filter types
export interface SearchFilters {
  city?: string;
  type?: AccommodationType | PartnerType;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface AccommodationFilters extends SearchFilters {
  type?: AccommodationType;
}

export interface CourseFilters extends SearchFilters {
  schoolName?: string;
  programType?: string;
  minWeeks?: number;
  maxWeeks?: number;
}

// Statistics types
export interface ReviewStats {
  averageSafety: number;
  averageLocation: number;
  averageExperience: number;
  totalReviews: number;
}