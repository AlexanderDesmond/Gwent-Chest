import { Injectable } from "@angular/core";
import { Deck } from "../models/deck";
import { DeckInfo } from "../models/deck-info";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DeckbuilderService {
  deck: Deck;
  deckInfo: DeckInfo;

  private initialSelectionSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

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

    // Check to see if the card is not a duplicate.
    if (!this.checkDuplicates(card)) {
      // Add card.
      this.deck.cards.push(card);

      // Update deck info.
      this.deckInfo.cardCount++;
      if (card.cardType === "Unit") {
        this.deckInfo.unitCount++;
      }
      this.deckInfo.usedProvisions += card.provision;
      //this.deckInfo.scraps += card.variations[key + "00"].craft.standard;

      // Add images.
      this.deck.images.push({
        card: card.name["en-US"],
        image: card.variations[key + "00"].art.medium
      });
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

          // Update deck info.
          this.deckInfo.cardCount++;
          if (card.cardType === "Unit") {
            this.deckInfo.unitCount++;
          }

          return true;
        }
      }
    }

    return false;
  }

  removeCard(card) {
    // Remove gold card, or bronze card if there is only a single copy in deck.
    if (card.type === "Gold" || (card.type === "Bronze" && !card.duplicate)) {
      for (let i = 0; i < this.deck.cards.length; ++i) {
        if (card.name["en-US"] === this.deck.cards[i].name["en-US"]) {
          // Remove card from deck.
          this.deck.cards.splice(i, 1);

          // Update deck info.
          this.deckInfo.cardCount--;
          if (card.cardType === "Unit") {
            this.deckInfo.unitCount--;
          }
          this.deckInfo.usedProvisions -= card.provision;
          //this.deckInfo.scraps -= card.variations[key + "00"].craft.standard;
        }
      }
    }

    // Remove first copy of bronze card if there is more than a single copy in deck.
    if (card.type === "Bronze" && card.duplicate) {
      for (let i = 0; i < this.deck.cards.length; ++i) {
        if (card.name["en-US"] === this.deck.cards[i].name["en-US"]) {
          // Set duplicate flag on card to false.
          this.deck.cards[i].duplicate = false;

          // Update deck info.
          this.deckInfo.cardCount--;
          if (card.cardType === "Unit") {
            this.deckInfo.unitCount--;
          }
          this.deckInfo.usedProvisions -= card.provision;
        }
      }
    }
  }

  saveDeck(name: string): boolean {
    const isValid = this.verifyDeck();
    if (isValid) {
      this.deck.info = this.deckInfo;
      this.addDeck(
        localStorage.getItem("currentUser"),
        this.deck,
        name
      ).subscribe(
        data => {
          this.router.navigate(["/catalogue"]);
        },
        error => {
          console.log("Problem saving deck to database.");
        }
      );
    }

    return isValid;
  }

  verifyDeck(): boolean {
    if (
      this.deckInfo &&
      this.deck &&
      this.deck.leader &&
      this.deck.strategem &&
      this.deck.cards
    ) {
      if (
        this.deckInfo.cardCount >= 25 &&
        this.deckInfo.unitCount >= 13 &&
        this.deckInfo.usedProvisions <= this.deckInfo.provisions
      ) {
        return true;
      }
    } else {
      return false;
    }
  }

  addDeck(username: string, deck: Deck, name: string) {
    return this.http.post("/api/decks/", { username, deck, name });
  }

  get initialSelection() {
    return this.initialSelectionSubject.asObservable();
  }
}
