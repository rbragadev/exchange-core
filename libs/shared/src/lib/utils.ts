// Utility functions and helpers
export const formatCurrency = (amount: number, currency = 'CAD'): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-CA');
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-CA');
};

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

// Rating helpers
export const calculateAverageRating = (
  safety?: number,
  location?: number,
  experience?: number,
): number => {
  const ratings = [safety, location, experience].filter(
    (rating): rating is number => rating !== undefined && rating !== null,
  );

  if (ratings.length === 0) return 0;

  return Number(
    (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(
      1,
    ),
  );
};

export const getRatingStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars)
  );
};

// String helpers
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatEnumValue = (value: string): string => {
  return value.split('_').map(capitalizeFirst).join(' ');
};

// Search helpers
export const buildSearchQuery = (
  filters: Record<string, any>,
): URLSearchParams => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  return params;
};

// Array helpers
export const uniqueBy = <T, K extends keyof T>(array: T[], key: K): T[] => {
  const seen = new Set();
  return array.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    }
    seen.add(keyValue);
    return true;
  });
};

export const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K,
): Record<string, T[]> => {
  return array.reduce(
    (groups, item) => {
      const keyValue = String(item[key]);
      if (!groups[keyValue]) {
        groups[keyValue] = [];
      }
      groups[keyValue].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
};

// Constants
export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 20,
  maxLimit: 100,
} as const;

export const RATING_RANGE = {
  min: 1,
  max: 5,
} as const;

export const CURRENCIES = {
  CAD: 'Canadian Dollar',
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
} as const;

export const COUNTRIES = {
  CA: 'Canada',
  US: 'United States',
  BR: 'Brazil',
  MX: 'Mexico',
  CO: 'Colombia',
  AR: 'Argentina',
  CL: 'Chile',
  PE: 'Peru',
  KR: 'South Korea',
  JP: 'Japan',
  CN: 'China',
  IN: 'India',
} as const;

export const CANADIAN_CITIES = [
  'Toronto',
  'Vancouver',
  'Montreal',
  'Calgary',
  'Ottawa',
  'Quebec City',
  'Winnipeg',
  'Halifax',
  'Victoria',
  'Saskatoon',
] as const;
