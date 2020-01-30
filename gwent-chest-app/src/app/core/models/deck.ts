import { Card } from "./card";

export interface Deck {
  faction: string;
  leader: {
    name: {
      "en-US": string;
    };
    image: {
      low: string;
      medium: string;
      thumbnail: string;
    };
    provisionBoost: number;
  };
  cards;
  //cards: Card[];
}
