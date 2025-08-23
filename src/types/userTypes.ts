export interface UserSimpleDTO {
  clientId: string;
  name: string;
  surname: string;
  clientPicture: ClientPictureDTO;
}

export interface ClientPictureDTO {
  clientPictureId: string;
  objectId: string;
  url: string;
}
