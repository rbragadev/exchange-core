// Re-export Prisma enums to maintain single source of truth
export { UserStatus, UserPhase, UserObjective, UserRole } from '@prisma/client';

// Base enums that don't exist in Prisma
export enum AccommodationType {
  HOMESTAY = 'HOMESTAY',
  SHARED = 'SHARED',
}

export enum LeadType {
  ACCOMMODATION = 'ACCOMMODATION',
  COURSE = 'COURSE',
}

export enum ReviewTargetType {
  ACCOMMODATION = 'ACCOMMODATION',
  COURSE = 'COURSE',
}

export enum PartnerType {
  SCHOOL = 'SCHOOL',
  HOMESTAY_PROVIDER = 'HOMESTAY_PROVIDER',
  AGENCY = 'AGENCY',
}

// Additional enums for API
export enum LeadStatus {
  NEW = 'NEW',
  SENT = 'SENT',
  CONTACTED = 'CONTACTED',
  WON = 'WON',
  LOST = 'LOST',
}

export enum ConfidenceLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum CopilotSource {
  HOME = 'HOME',
  COURSE_DETAIL = 'COURSE_DETAIL',
  ACCOMMODATION_DETAIL = 'ACCOMMODATION_DETAIL',
  SEARCH = 'SEARCH',
}

export enum LeadSource {
  COPILOT = 'COPILOT',
  LISTING = 'LISTING',
  DETAIL = 'DETAIL',
  ORGANIC = 'ORGANIC',
}
