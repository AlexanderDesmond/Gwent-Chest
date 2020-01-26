import { Component, OnInit } from "@angular/core";

// Testing
import Cards from "../../../assets/gwent-data-release/cards.json";

import { CardService } from "src/app/core/services/card.service";
import { Deck } from "src/app/core/models/deck.js";
import { DeckService } from "src/app/core/services/deck.service.js";

@Component({
  selector: "app-cards-list",
  templateUrl: "./cards-list.component.html",
  styleUrls: ["./cards-list.component.scss"]
})
export class CardsListComponent implements OnInit {
  cards = Cards;
  cardKeys;

  card: object;
  deck: Deck;

  constructor(
    private cardService: CardService,
    private deckService: DeckService
  ) {
    this.cardKeys = Object.keys(this.cards);
  }

  ngOnInit() {
    this.cardService.currentCard.subscribe(card => (this.card = card));
    this.deckService.currentDeck.subscribe(deck => (this.deck = deck));
  }

  selectCard(card) {
    console.log(card);

    if (this.deck.leader === null && card.cardType === "Leader") {
      this.deck.leader = card;
      this.deck.faction = card.faction;
      this.deck.cards = [];
    } else if (
      this.deck.leader !== null &&
      card.cardType !== "Leader" &&
      (this.deck.faction === card.faction || card.faction === "Neutral")
    ) {
      this.deck.cards.push(card);
    }

    this.cardService.addCard(card);
    this.deckService.buildDeck(this.deck);
  }
}
