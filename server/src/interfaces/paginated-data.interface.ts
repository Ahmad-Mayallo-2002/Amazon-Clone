import { IPagination } from "./pagination.interface";

export interface PaginatedDate<T> {
    data: T[];
    pagination: IPagination;
}