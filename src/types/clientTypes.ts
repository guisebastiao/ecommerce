export enum Role {
  ADMIN,
  CLIENT,
}

export interface ClientSimpleDTO {
  clientId: string;
  name: string;
  surname: string;
  phone: string;
  birth: string;
  role: Role;
  clientPicture: ClientPictureDTO | null;
}

export interface ClientPictureDTO {
  clientPictureId: string;
  objectId: string;
  url: string;
}
