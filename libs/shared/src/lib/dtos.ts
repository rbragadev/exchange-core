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
  CopilotSource,
  LeadSource,
} from './enums.js';

// Base DTO interfaces
export interface BaseDto {
  id?: string;
}

export interface TimestampDto {
  createdAt?: Date;
  updatedAt?: Date;
}

// User DTOs
export interface CreateUserDto {
  email: string;
  name?: string;
  bio?: string;
  role?: UserRole;
  originCountry?: string;
  originCity?: string;
  destinationCity?: string;
  status?: UserStatus;
  phase?: UserPhase;
  objective?: UserObjective;
}

export interface UpdateUserDto {
  name?: string;
  bio?: string;
  badge?: string;
  originCountry?: string;
  originCity?: string;
  destinationCity?: string;
  status?: UserStatus;
  phase?: UserPhase;
  objective?: UserObjective;
}

export interface UserResponseDto extends BaseDto, TimestampDto {
  email: string;
  name?: string;
  bio?: string;
  role?: UserRole;
  badge?: string;
  reputationScore?: number;
  isActive: boolean;
  originCountry?: string;
  originCity?: string;
  destinationCity?: string;
  status?: UserStatus;
  phase?: UserPhase;
  objective?: UserObjective;
}

// Partner DTOs
export interface CreatePartnerDto {
  type: PartnerType;
  name: string;
  contactEmail?: string;
  whatsapp?: string;
  website?: string;
  payoutModel?: string;
}

export interface UpdatePartnerDto {
  name?: string;
  contactEmail?: string;
  whatsapp?: string;
  website?: string;
  payoutModel?: string;
  isActive?: boolean;
}

export interface PartnerResponseDto extends BaseDto, TimestampDto {
  type: PartnerType;
  name: string;
  contactEmail?: string;
  whatsapp?: string;
  website?: string;
  payoutModel?: string;
  isActive: boolean;
}

// Accommodation DTOs
export interface CreateAccommodationDto {
  type: AccommodationType;
  title: string;
  city: string;
  priceCad: number;
  currency?: string;
  lat?: number;
  lng?: number;
  addressHint?: string;
  rules?: string;
  description?: string;
  partnerId?: string;
}

export interface UpdateAccommodationDto {
  title?: string;
  city?: string;
  priceCad?: number;
  currency?: string;
  lat?: number;
  lng?: number;
  addressHint?: string;
  rules?: string;
  description?: string;
  active?: boolean;
  partnerId?: string;
}

export interface AccommodationResponseDto extends BaseDto, TimestampDto {
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
  partner?: PartnerResponseDto;
  reviewsCount?: number;
  averageRating?: number;
}

// Course DTOs
export interface CreateCourseDto {
  schoolName: string;
  programName: string;
  programType?: string;
  city: string;
  weeklyHours?: number;
  durationWeeks?: number;
  priceCad?: number;
  currency?: string;
  visaType?: string;
  rules?: string;
  description?: string;
  partnerId?: string;
}

export interface UpdateCourseDto {
  schoolName?: string;
  programName?: string;
  programType?: string;
  city?: string;
  weeklyHours?: number;
  durationWeeks?: number;
  priceCad?: number;
  currency?: string;
  visaType?: string;
  rules?: string;
  description?: string;
  active?: boolean;
  partnerId?: string;
}

export interface CourseResponseDto extends BaseDto, TimestampDto {
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
  partner?: PartnerResponseDto;
  reviewsCount?: number;
  averageRating?: number;
}

// Review DTOs
export interface CreateReviewDto {
  userId: string;
  targetType: ReviewTargetType;
  accommodationId?: string;
  courseId?: string;
  ratingSafety?: number;
  ratingLocation?: number;
  ratingExperience?: number;
  comment?: string;
}

export interface ReviewResponseDto extends BaseDto {
  userId: string;
  user?: UserResponseDto;
  targetType: ReviewTargetType;
  accommodationId?: string;
  courseId?: string;
  ratingSafety?: number;
  ratingLocation?: number;
  ratingExperience?: number;
  comment?: string;
  createdAt: Date;
}

// Lead DTOs
export interface CreateLeadDto {
  userId?: string;
  type: LeadType;
  accommodationId?: string;
  courseId?: string;
  partnerId?: string;
  name: string;
  email: string;
  message?: string;
  source?: LeadSource;
}

export interface UpdateLeadDto {
  status?: LeadStatus;
  message?: string;
}

export interface LeadResponseDto extends BaseDto {
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

// Copilot DTOs
export interface CreateCopilotSessionDto {
  userId?: string;
  question: string;
  response: string;
  recommendedAccommodationIds?: string[];
  recommendedCourseIds?: string[];
  modelName?: string;
  latencyMs?: number;
  source?: CopilotSource;
  confidence?: string;
  warnings?: string[];
}

export interface CopilotSessionResponseDto extends BaseDto {
  userId?: string;
  question: string;
  response: string;
  recommendedAccommodationIds: string[];
  recommendedCourseIds: string[];
  modelName?: string;
  latencyMs?: number;
  source?: CopilotSource;
  confidence?: string;
  warnings: string[];
  createdAt: Date;
}

// Search DTOs
export interface SearchDto {
  query?: string;
  city?: string;
  page?: number;
  limit?: number;
}

export interface AccommodationSearchDto extends SearchDto {
  type?: AccommodationType;
  minPrice?: number;
  maxPrice?: number;
}

export interface CourseSearchDto extends SearchDto {
  schoolName?: string;
  programType?: string;
  minWeeks?: number;
  maxWeeks?: number;
  minPrice?: number;
  maxPrice?: number;
}

// Auth DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name?: string;
  originCountry?: string;
  destinationCity?: string;
  status?: UserStatus;
  objective?: UserObjective;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken?: string;
}

// Pagination DTOs
export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponseDto<T> {
  data: T[];
  pagination: PaginationDto;
}
