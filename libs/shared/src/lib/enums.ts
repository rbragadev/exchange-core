// Base enums from Prisma schema
export enum UserStatus {
  STUDENT = 'STUDENT',
  WORKER = 'WORKER',
}

export enum UserPhase {
  PRE_ARRIVAL = 'PRE_ARRIVAL',
  FIRST_30_DAYS = 'FIRST_30_DAYS',
  SETTLED = 'SETTLED',
}

export enum UserObjective {
  ACCOMMODATION = 'ACCOMMODATION',
  COURSE = 'COURSE',
  BOTH = 'BOTH',
}

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

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
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
