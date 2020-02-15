import { Injectable } from "@angular/core";
import { Deck } from "../models/deck";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DeckService {
  private deckSource = new BehaviorSubject<Deck>({
    faction: null,
    leader: null,
    strategem: null,
    cards: null,
    images: null,
    info: null
  });
  currentDeck = this.deckSource.asObservable();

  constructor(private http: HttpClient) {}

  buildDeck(deck: Deck) {
    this.deckSource.next(deck);

    console.log("Deck: ", deck);
  }

  get deck() {
    return this.deckSource.asObservable();
  }

  getCatalogue() {
    return this.http.get("/api/decks");
  }

  getDeck(id: string) {
    return this.http.get("/api/decks/" + id);
  }

  isDuplicate(card): boolean {
    let copyCounter: number = 1;

    if (this.deckSource.value.cards.length > 0) {
      for (let duplicate in this.deckSource.value.cards) {
        if (
          card.name["en-US"] ===
          this.deckSource.value.cards[duplicate].name["en-US"]
        ) {
          if (copyCounter > 1) {
            return true;
          }
          ++copyCounter;
        }
      }
    }

    return false;
  }
}
