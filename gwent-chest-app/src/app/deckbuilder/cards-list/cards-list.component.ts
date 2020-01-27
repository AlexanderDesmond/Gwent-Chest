import { Component, OnInit } from "@angular/core";

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

  initialSelection: boolean = false;

  key;

  //stuff
  minCards: number = 25;
  cardCount: number = 0;
  minUnits: number = 13;
  unitCount: number = 0;
  baseProvisions: number = 150;
  provisions: number = 0;
  usedProvisions: number = 0;

  constructor(
    private cardService: CardService,
    private deckService: DeckService
  ) {
    this.cardKeys = Object.keys(this.cards);

    this.provisions += this.baseProvisions;
  }

  ngOnInit() {
    this.cardService.currentCard.subscribe(card => (this.card = card));
    this.deckService.currentDeck.subscribe(deck => (this.deck = deck));
  }

  selectCard(card, key) {
    if (this.deck.leader === null && card.cardType === "Leader") {
      this.deck.leader = card;
      this.deck.faction = card.faction;
      this.deck.cards = [];
      this.initialSelection = true;

      this.deck.leader.image = { low: "", medium: "", thumbnail: "" };
      this.deck.leader.image.thumbnail = card.variations[key + "00"].art.low;

      this.provisions += card.provisionBoost;
    } else if (this.deck.leader !== null && card.cardType === "Leader") {
      this.deck.leader = card;

      this.deck.leader.image = { low: "", medium: "", thumbnail: "" };
      this.deck.leader.image.thumbnail = card.variations[key + "00"].art.low;

      this.provisions = this.baseProvisions + card.provisionBoost;
    } else if (
      this.deck.leader !== null &&
      card.cardType !== "Leader" &&
      (this.deck.faction === card.faction ||
        this.deck.faction === card.secondaryFaction ||
        card.faction === "Neutral")
    ) {
      this.deck.cards.push(card);

      this.cardCount++;
      if (card.cardType === "Unit") {
        this.unitCount++;
      }
      this.usedProvisions += card.provision;
    }

    this.cardService.addCard(card);
    this.deckService.buildDeck(this.deck);

    //this.getKey(card);
  }

  addKey(key) {
    this.key = key;

    console.log("Current Key: ", this.key);
  }

  getKey(name) {
    console.log(this.cardKeys);

    for (let key in this.cardKeys) {
      if (this.cards[key].name["en-US"] === name) {
        this.key = key;
      }
    }
  }
}
