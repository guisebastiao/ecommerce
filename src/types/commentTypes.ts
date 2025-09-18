import type { ClientSimpleDTO } from "./clientTypes";

export interface CommentQueryParams {
  offset: string;
  limit: string;
}

export interface CommentDTO {
  commentId: string;
  content: string;
  belongsToAuthUser: boolean;
  createdAt: Date;
  client: ClientSimpleDTO;
}
