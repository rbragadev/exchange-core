import {
  IsEmail,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDate,
  IsArray,
  IsUrl,
  IsUUID,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
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
import { User as PrismaUser } from '@prisma/client';

// Base DTO classes
export abstract class BaseDto {
  @IsOptional()
  @IsUUID()
  id?: string;
}

export abstract class TimestampDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}

// User DTOs
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  originCountry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  originCity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  destinationCity?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsEnum(UserPhase)
  phase?: UserPhase;

  @IsOptional()
  @IsEnum(UserObjective)
  objective?: UserObjective;
}

export class UpdateUserDto implements Partial<CreateUserDto> {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  badge?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  originCountry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  originCity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  destinationCity?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsEnum(UserPhase)
  phase?: UserPhase;

  @IsOptional()
  @IsEnum(UserObjective)
  objective?: UserObjective;
}

export class UserResponseDto implements PrismaUser {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string | null;

  @IsString()
  bio: string | null;

  @IsEnum(['USER', 'ADMIN', 'PARTNER'])
  role: UserRole | null;

  @IsString()
  badge: string | null;

  @IsNumber()
  @Min(0)
  reputationScore: number | null;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  originCountry: string | null;

  @IsString()
  originCity: string | null;

  @IsString()
  destinationCity: string | null;

  @IsEnum(['STUDENT', 'WORKER'])
  status: UserStatus | null;

  @IsEnum(['PRE_ARRIVAL', 'FIRST_30_DAYS', 'SETTLED'])
  phase: UserPhase | null;

  @IsEnum(['ACCOMMODATION', 'COURSE', 'BOTH'])
  objective: UserObjective | null;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}

// Partner DTOs
export class CreatePartnerDto {
  @IsEnum(PartnerType)
  type: PartnerType;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  whatsapp?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  payoutModel?: string;
}

export class UpdatePartnerDto implements Partial<CreatePartnerDto> {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  name?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  whatsapp?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  payoutModel?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// Accommodation DTOs
export class CreateAccommodationDto {
  @IsEnum(AccommodationType)
  type: AccommodationType;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @IsNumber()
  @IsPositive()
  priceCad: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng?: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  addressHint?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  rules?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsUUID()
  partnerId?: string;
}

export class UpdateAccommodationDto implements Partial<CreateAccommodationDto> {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  priceCad?: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng?: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  addressHint?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  rules?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsUUID()
  partnerId?: string;
}

// Course DTOs
export class CreateCourseDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  schoolName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  programName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  programType?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(168)
  weeklyHours?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(520)
  durationWeeks?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  priceCad?: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  visaType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  rules?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsUUID()
  partnerId?: string;
}

export class UpdateCourseDto implements Partial<CreateCourseDto> {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  schoolName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  programName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  programType?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(168)
  weeklyHours?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(520)
  durationWeeks?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  priceCad?: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  visaType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  rules?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsUUID()
  partnerId?: string;
}

// Review DTOs
export class CreateReviewDto {
  @IsUUID()
  userId: string;

  @IsEnum(ReviewTargetType)
  targetType: ReviewTargetType;

  @IsOptional()
  @IsUUID()
  accommodationId?: string;

  @IsOptional()
  @IsUUID()
  courseId?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  ratingSafety?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  ratingLocation?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  ratingExperience?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;
}

// Lead DTOs
export class CreateLeadDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsEnum(LeadType)
  type: LeadType;

  @IsOptional()
  @IsUUID()
  accommodationId?: string;

  @IsOptional()
  @IsUUID()
  courseId?: string;

  @IsOptional()
  @IsUUID()
  partnerId?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;

  @IsOptional()
  @IsEnum(LeadSource)
  source?: LeadSource;
}

export class UpdateLeadDto implements Partial<CreateLeadDto> {
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;
}

// Copilot DTOs
export class CreateCopilotSessionDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(2000)
  question: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  response: string;

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  recommendedAccommodationIds?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  recommendedCourseIds?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  modelName?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  latencyMs?: number;

  @IsOptional()
  @IsEnum(CopilotSource)
  source?: CopilotSource;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  confidence?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  warnings?: string[];
}

// Search DTOs
export class SearchDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  query?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number;
}

export class AccommodationSearchDto extends SearchDto {
  @IsOptional()
  @IsEnum(AccommodationType)
  type?: AccommodationType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  maxPrice?: number;
}

export class CourseSearchDto extends SearchDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  schoolName?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  programType?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  minWeeks?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  maxWeeks?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  maxPrice?: number;
}

// Auth DTOs
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(128)
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(128)
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  originCountry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  destinationCity?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsEnum(UserObjective)
  objective?: UserObjective;
}

// Pagination DTOs
export class PaginationDto {
  @IsNumber()
  @Min(1)
  page: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number;

  @IsNumber()
  @Min(0)
  total: number;

  @IsNumber()
  @Min(1)
  totalPages: number;
}

export class PaginatedResponseDto<T> {
  @IsArray()
  data: T[];

  @ValidateNested()
  @Type(() => PaginationDto)
  pagination: PaginationDto;
}

// API Response DTO
export class ApiResponse<T> {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  data?: T;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  errors?: string[];
}
