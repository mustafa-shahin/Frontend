// Common utility types and interfaces

// Paged Result
export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// API Response types
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

// File types
export interface FileDto {
  id: number;
  fileName: string;
  originalFileName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}

// Address types
export interface AddressDto {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
}

export interface CreateAddressDto {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
}

export interface UpdateAddressDto {
  id?: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
}

// Contact details types
export interface ContactDetailsDto {
  id: number;
  contactType: string;
  value: string;
}

export interface CreateContactDetailsDto {
  contactType: string;
  value: string;
}

export interface UpdateContactDetailsDto {
  id?: number;
  contactType: string;
  value: string;
}

// Generic filter and sort types
export interface FilterOptions {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: any;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

// Form types
export interface FormFieldOption {
  label: string;
  value: string | number;
}

export interface ValidationError {
  field: string;
  message: string;
}
