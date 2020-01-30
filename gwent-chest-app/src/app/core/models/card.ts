export interface Card {
  cardType: string;
  categories: [];
  faction: string;
  name: {
    "en-US": string;
  };
  info: {
    "en-US": string;
  };
  provision: number;
  strength: number;
  type: string;
  image: {
    low: string;
    medium: string;
    thumbnail: string;
  };
}
