export interface PaginationType<T> {
  totalItems: number;
  take: number;
  items: T[];
}
