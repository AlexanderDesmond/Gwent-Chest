export interface Deck {
  faction: string;
  leader: {
    name: [];
    image: {
      low: string;
      medium: string;
      thumbnail: string;
    };
    provisionBoost: number;
  };
  cards: object[];
}
