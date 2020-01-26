import { Injectable } from "@angular/core";
import { Deck } from "../models/deck";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DeckService {
  private deckSource = new BehaviorSubject<Deck>({
    faction: null,
    leader: null,
    cards: null
  });
  currentDeck = this.deckSource.asObservable();

  deck: Deck;

  constructor() {}

  buildDeck(deck: Deck) {
    console.log("Deck: ", deck);
  }
}
