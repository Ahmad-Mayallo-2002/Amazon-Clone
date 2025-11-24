import { IPagination } from "./pagination.interface";

export interface IResponse<T> {
  data: T;
  msg: string;
  status: number;
  pagination?: IPagination;
  counts?: number;
}
