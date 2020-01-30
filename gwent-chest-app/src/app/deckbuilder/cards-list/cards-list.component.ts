import { Component, OnInit } from "@angular/core";

import Cards from "../../../assets/gwent-data-release/cards.json";
import { CardService } from "src/app/core/services/card.service";
import { Deck } from "src/app/core/models/deck.js";
import { Card } from "src/app/core/models/card";
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
  keys = [];

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
    if (card.cardType === "Leader") {
      this.addLeader(card, key);
    } else if (
      this.deck.faction === card.faction ||
      this.deck.faction === card.secondaryFaction ||
      card.faction === "Neutral"
    ) {
      this.addCard(card, key);
    }

    this.cardService.addCard(card);
    this.deckService.buildDeck(this.deck);
  }

  addLeader(card, key) {
    if (this.deck.leader === null) {
      this.deck.faction = card.faction;
      this.deck.leader = card;
      this.deck.cards = [];

      this.deck.leader.image = { low: "", medium: "", thumbnail: "" };
      this.deck.leader.image.thumbnail = card.variations[key + "00"].art.medium;

      this.deck.images = [];
      this.deck.images.unshift({
        card: card.name["en-US"],
        image: card.variations[key + "00"].art.medium
      });

      this.provisions += card.provisionBoost;

      this.initialSelection = true;
    } else {
      this.deck.leader = card;

      this.deck.leader.image = { low: "", medium: "", thumbnail: "" };
      this.deck.leader.image.thumbnail = card.variations[key + "00"].art.medium;

      this.deck.images.shift();
      this.deck.images.unshift({
        card: card.name["en-US"],
        image: card.variations[key + "00"].art.medium
      });

      this.provisions = this.baseProvisions + card.provisionBoost;
    }
  }

  addCard(card, key) {
    this.getKey(card.name["en-US"]);

    if (!this.checkDuplicates(card)) {
      this.deck.cards.push(card);

      this.cardCount++;
      if (card.cardType === "Unit") {
        this.unitCount++;
      }

      this.deck.images.push({
        card: card.name["en-US"],
        image: card.variations[key + "00"].art.medium
      });

      this.usedProvisions += card.provision;
    }
  }

  checkDuplicates(card): boolean {
    let copyCounter: number = 1;

    for (let deckCard of this.deck.cards) {
      if (card.type === "Gold") {
        if (card.name["en-US"] === deckCard.name["en-US"]) {
          return true;
        }
      } else if (card.type === "Bronze") {
        if (card.name["en-US"] === deckCard.name["en-US"]) {
          if (copyCounter >= 2) {
            return true;
          }

          ++copyCounter;
        }
      }
    }

    return false;
  }

  getPreviewImage(name) {
    for (let image in this.deck.images) {
      let index = parseInt(image);
      if (this.deck.images[index].card === name) {
        return this.deck.images[index].image;
      }
    }
  }

  getCardPreviewStyles(card) {
    return {
      "background-image":
        "url(" + this.getPreviewImage(card.name["en-US"]) + ")"
    };
  }

  addKey(key) {
    this.key = key;

    this.keys.push(key);

    console.log("Current Key: ", this.key);
    console.log("Keys:", this.keys);
  }

  getKey(name) {}
}
