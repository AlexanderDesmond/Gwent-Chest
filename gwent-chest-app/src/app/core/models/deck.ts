import { Card } from "./card";

export interface Deck {
  faction: string;
  leader: {
    cardType: string;
    name: {
      "en-US": string;
    };
    info: {
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
