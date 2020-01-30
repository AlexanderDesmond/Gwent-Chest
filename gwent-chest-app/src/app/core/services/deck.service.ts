import { Injectable } from "@angular/core";
import { Deck } from "../models/deck";
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DeckService {
  private deckSource = new BehaviorSubject<Deck>({
    faction: null,
    leader: null,
    cards: null,
    images: null
  });
  currentDeck = this.deckSource.asObservable();

  constructor() {}

  buildDeck(deck: Deck) {
    this.deckSource.next(deck);

    console.log("Deck: ", deck);
  }

  get deck() {
    return this.deckSource.asObservable();
  }
}
