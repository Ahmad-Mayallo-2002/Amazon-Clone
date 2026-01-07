export interface ErrorMessage {
  status: number;
  message: string;
  error: any;
}

export interface CustomError extends Error {
  response: {
    data: ErrorMessage;
  };
}

interface Pagination {
  prev: boolean;
  next: boolean;
  currentPage: number;
  totalPages: number;
  counts: number;
}

export interface Response<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedDate<T> extends Response<T> {
  pagination: Pagination;
}
