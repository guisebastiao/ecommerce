import type { ClientSimpleDTO } from "./clientTypes";

export interface ReviewQueryParams {
  offset: string;
  limit: string;
}

export interface ReviewDTO {
  reviewId: string;
  rating: number;
  client: ClientSimpleDTO;
}
