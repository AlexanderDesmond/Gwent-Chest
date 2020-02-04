import { Component, OnInit } from "@angular/core";
import { Deck } from "src/app/core/models/deck";
import { DeckbuilderService } from "src/app/core/services/deckbuilder.service";
import { CardService } from "src/app/core/services/card.service";
import { DeckService } from "src/app/core/services/deck.service";
import { DeckInfo } from "src/app/core/models/deck-info";

import Cards from "../../../../assets/gwent-data-release/cards.json";

@Component({
  selector: "app-deckbuilder",
  templateUrl: "./deckbuilder.component.html",
  styleUrls: ["./deckbuilder.component.scss"]
})
export class DeckbuilderComponent implements OnInit {
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

  // Select a card to add to the deck.
  selectCard(card, key) {
    this.deck = this.deckbuilderService.generateDeck(
      this.deck,
      this.deckInfo,
      card,
      key
    );
    this.deckInfo = this.deckbuilderService.deckInfo;

    this.cardService.addCard(card);
    this.deckService.buildDeck(this.deck);
  }

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

  isDuplicate(card): boolean {
    return this.deckService.isDuplicate(card);
  }

  // test
  getDeckTest() {
    console.log("Got list deck right here: ", this.deck);
  }
}
