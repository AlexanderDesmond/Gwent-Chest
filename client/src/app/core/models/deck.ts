import { Card } from "./card";
import { DeckInfo } from "./deck-info";

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
  strategem: {
    cardType: string;
    faction: string;
    name: {
      "en-US": string;
    };
    info: {
      "en-US": string;
    };
    image: Image;
  };
  //cards;
  cards: Card[];
  images: Image[];
  info: DeckInfo;
}

export interface Image {
  card: string;
  image: string;
}
