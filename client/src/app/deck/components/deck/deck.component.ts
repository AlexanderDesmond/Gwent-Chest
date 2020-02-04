import { Component, OnInit, Input } from "@angular/core";

import { CardService } from "src/app/core/services/card.service";
import { Deck } from "src/app/core/models/deck";
import { DeckService } from "src/app/core/services/deck.service";
import { DeckbuilderService } from "src/app/core/services/deckbuilder.service";
import { DeckInfo } from "src/app/core/models/deck-info";

@Component({
  selector: "app-deck",
  templateUrl: "./deck.component.html",
  styleUrls: ["./deck.component.scss"]
})
export class DeckComponent implements OnInit {
  @Input() deck: Deck;

  @Input() deckInfo: DeckInfo = {
    minCards: 25,
    cardCount: 0,
    minUnits: 13,
    unitCount: 0,
    baseProvisions: 150,
    provisions: 0,
    usedProvisions: 0
  };

  constructor() {
    this.deckInfo.provisions += this.deckInfo.baseProvisions;
  }

  ngOnInit() {}

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
