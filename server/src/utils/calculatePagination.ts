import { IPagination } from "../interfaces/pagination.interface";
import AppError from "./appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "./statusCodes";

export const calculatePagination = (
  counts: number,
  skip: number,
  take: number
): IPagination => {
  const totalPages: number =
    counts % take === 0 ? counts / take : Math.floor(counts / take) + 1;

  const currentPage: number = skip + 1;

  if (currentPage > totalPages)
    throw new AppError("Page not found", NOT_FOUND, NOT_FOUND_REASON);

  const pagination = {
    totalPages,
    currentPage,
    next: currentPage < totalPages,
    prev: currentPage > 1,
  };

  return pagination;
};
