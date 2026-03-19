export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  fields?: string[];
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
