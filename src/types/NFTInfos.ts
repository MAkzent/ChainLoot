export interface INFTInfos {
  [id: string]: {
    id: number;
    name: string;
    image: string;
    price: number;
    xp: number;
    uri: string;
  };
}

export type particleId = 0 | 1 | 2;

export interface IProton {
  name: string;
  description: string;
  tokenId: number;
  id: number;
  creator: string;
  owner: string;
  image: string;
  thumbnail: string;
  animation_url: string;
}
