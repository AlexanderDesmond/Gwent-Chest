import { Component, OnInit } from "@angular/core";

import { CardService } from "src/app/core/services/card.service";
import { Deck } from "src/app/core/models/deck";
import { DeckService } from "src/app/core/services/deck.service";

@Component({
  selector: "app-deck",
  templateUrl: "./deck.component.html",
  styleUrls: ["./deck.component.scss"]
})
export class DeckComponent implements OnInit {
  minCards: number = 25;
  cardCount: number = 0;
  minUnits: number = 13;
  unitCount: number = 0;
  baseProvisions: number = 150;
  provisions: number;
  usedProvisions: number = 0;

  deck: Deck;
  card: object;

  constructor(
    private deckService: DeckService,
    private cardService: CardService
  ) {}

  ngOnInit() {
    this.deckService.currentDeck.subscribe(deck => (this.deck = deck));
    this.cardService.currentCard.subscribe(card => (this.card = card));
  }
}
