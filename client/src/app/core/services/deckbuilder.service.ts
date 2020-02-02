import { Injectable } from "@angular/core";
import { Deck } from "../models/deck";
import { DeckInfo } from "../models/deck-info";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DeckbuilderService {
  deck: Deck;
  deckInfo: DeckInfo;

  private initialSelectionSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  generateDeck(deck, deckInfo, card, key) {
    this.deck = deck;
    this.deckInfo = deckInfo;
    console.log(this.deckInfo);

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

    return this.deck;
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

      this.deckInfo.provisions += card.provisionBoost;

      //this.initialSelection = true;
      this.initialSelectionSubject.next(true);
    } else {
      this.deck.leader = card;

      this.deck.leader.image = { low: "", medium: "", thumbnail: "" };
      this.deck.leader.image.thumbnail = card.variations[key + "00"].art.medium;

      this.deck.images.shift();
      this.deck.images.unshift({
        card: card.name["en-US"],
        image: card.variations[key + "00"].art.medium
      });

      this.deckInfo.provisions =
        this.deckInfo.baseProvisions + card.provisionBoost;
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
    //this.getKey(card.name["en-US"]);

    if (!this.checkDuplicates(card)) {
      this.deck.cards.push(card);

      this.deckInfo.cardCount++;
      if (card.cardType === "Unit") {
        this.deckInfo.unitCount++;
      }

      this.deck.images.push({
        card: card.name["en-US"],
        image: card.variations[key + "00"].art.medium
      });

      this.deckInfo.usedProvisions += card.provision;
    }

    console.log(this.deck.cards);
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
          if (copyCounter > 1) {
            deckCard.duplicate = true;
            return true;
          }
          deckCard.duplicate = true;

          ++copyCounter;
        }
      }
    }

    return false;
  }

  get initialSelection() {
    return this.initialSelectionSubject.asObservable();
  }
}
