import { Component, OnInit } from "@angular/core";

import Cards from "../../../assets/gwent-data-release/cards.json";
import { CardService } from "src/app/core/services/card.service";
import { Deck } from "src/app/core/models/deck.js";
import { Card } from "src/app/core/models/card";
import { DeckService } from "src/app/core/services/deck.service.js";
import { DeckbuilderService } from "src/app/core/services/deckbuilder.service.js";
import { DeckInfo } from "src/app/core/models/deck-info.js";

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

  deckInfo: DeckInfo = {
    minCards: 25,
    cardCount: 0,
    minUnits: 13,
    unitCount: 0,
    baseProvisions: 150,
    provisions: 0,
    usedProvisions: 0
  };

  initialSelection: boolean = false;

  constructor(
    private deckbuilderService: DeckbuilderService,
    private cardService: CardService,
    private deckService: DeckService
  ) {
    this.cardKeys = Object.keys(this.cards);

    this.deckInfo.provisions += this.deckInfo.baseProvisions;
  }

  ngOnInit() {
    this.cardService.currentCard.subscribe(card => (this.card = card));
    this.deckService.currentDeck.subscribe(deck => (this.deck = deck));

    this.deckbuilderService.initialSelection.subscribe(
      initialSelection => (this.initialSelection = initialSelection)
    );
  }

  selectCard(card, key) {
    this.deck = this.deckbuilderService.generateDeck(
      this.deck,
      this.deckInfo,
      card,
      key
    );
    this.deckInfo = this.deckbuilderService.deckInfo;

    /*
    if (card.cardType === "Leader") {
      this.addLeader(card, key);
    } else if (card.cardType === "Strategem") {
      this.addStrategem(card, key);
    } else if (
      this.deck.faction === card.faction ||
      this.deck.faction === card.secondaryFaction ||
      card.faction === "Neutral"
    ) {
      this.addCard(card, key);
    }
    */

    this.cardService.addCard(card);
    this.deckService.buildDeck(this.deck);
  }

  /*
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

  addStrategem(card, key) {
    this.deck.strategem = {
      cardType: card.cardType,
      faction: card.faction,
      name: card.name,
      info: card.info,
      image: {
        card: card.name["en-US"],
        image: card.variations[key + "00"].art.medium
      }
    };
    console.log(this.deck);
  }

  addCard(card, key) {
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
  */

  // Return a background image for the card previews.
  getCardPreviewStyles(card) {
    return {
      "background-image":
        "url(" + this.getPreviewImage(card.name["en-US"]) + ")"
    };
  }

  // Return the image of the card whose name matches the 'name' parameter.
  getPreviewImage(name) {
    // Go through the array or images to find the correct image.
    for (let image in this.deck.images) {
      let index = parseInt(image);
      if (this.deck.images[index].card === name) {
        return this.deck.images[index].image;
      }
    }
  }
}
