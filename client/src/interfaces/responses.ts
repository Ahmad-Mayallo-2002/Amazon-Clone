export interface ErrorMessage {
  status: number;
  message: string;
  error: any;
};

interface Pagination {
  prev: boolean;
  next: boolean;
  currentPage: number;
  totalPages: number;
};

export interface Response<T> {
  status: number;
  message: string;
  data: T;
  pagination?: Pagination;
};
