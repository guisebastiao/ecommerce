export enum Role {
  ADMIN,
  CLIENT,
}

export interface ClientSimpleDTO {
  clientId: string;
  name: string;
  surname: string;
  role: Role;
  clientPicture: ClientPictureDTO;
}

export interface ClientPictureDTO {
  clientPictureId: string;
  objectId: string;
  url: string;
}
