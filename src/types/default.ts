export interface DefaultDTO<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PagingDTO {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface PageResponseDTO<T> {
  items: T[];
  paging: PagingDTO;
}
