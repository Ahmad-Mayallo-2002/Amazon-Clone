import { IPagination } from "./pagination.interface";

export interface IResponse<T> {
  data: T;
  message: string;
  status: number;
  pagination?: IPagination;
  counts?: number;
}
