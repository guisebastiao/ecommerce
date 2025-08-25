import type { ClientSimpleDTO } from "./clientTypes";

export interface ActiveLoginDTO {
  expiresAccessToken: Date;
  expiresRefreshToken: Date;
  client: ClientSimpleDTO;
}
