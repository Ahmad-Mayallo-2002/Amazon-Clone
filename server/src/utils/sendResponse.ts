import { Response } from "express";
import { IPagination } from "../interfaces/pagination.interface";
import { IResponse } from "../interfaces/response.interface";

export function sendResponse<T>(
  res: Response,
  data: T,
  status: number,
  message: string,
  pagination: IPagination = {
    prev: false,
    next: false,
    currentPage: 0,
    totalPages: 0,
    counts: 0,
  }
) {
  const response: IResponse<T> = {
    data,
    status,
    message,
  };
  if (Array.isArray(data)) response.pagination = pagination;
  res.status(status).json(response);
}
