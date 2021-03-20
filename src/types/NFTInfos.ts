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
