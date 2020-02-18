import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Deck } from "src/app/core/models/deck";
import { DeckbuilderService } from "src/app/core/services/deckbuilder.service";
import { CardService } from "src/app/core/services/card.service";
import { DeckService } from "src/app/core/services/deck.service";
import { DeckInfo } from "src/app/core/models/deck-info";

import { FormBuilder, FormGroup } from "@angular/forms";

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

  // Deck info
  deckInfo: DeckInfo = {
    minCards: 25,
    cardCount: 0,
    minUnits: 13,
    unitCount: 0,
    baseProvisions: 150,
    provisions: 0,
    usedProvisions: 0,
    scraps: 0
  };

  initialSelection: boolean = false;
  isValidDeck: boolean = true;

  cardsList = [];

  // Options for filter.
  faction: string;
  type: string;
  colour: string;

  form;

  constructor(
    private deckbuilderService: DeckbuilderService,
    private cardService: CardService,
    private deckService: DeckService,
    private formBuilder: FormBuilder
  ) {
    this.cardKeys = Object.keys(this.cards);
    this.deckInfo.provisions += this.deckInfo.baseProvisions;

    // Create array for all cards (excluding leaders and strategems);
    this.cardsList = Object.keys(this.cards)
      .map(key => ({
        id: key,
        data: this.cards[key]
      }))
      .filter(
        card =>
          card.data.cardType !== "Leader" &&
          card.data.cardType !== "Strategem" &&
          card.data.provision !== 0
      )
      .sort((a, b) => b.data.provision - a.data.provision);
    console.log("Card List: ", this.cardsList);
  }

  ngOnInit() {
    this.cardService.currentCard.subscribe(card => (this.card = card));
    this.deckService.currentDeck.subscribe(deck => (this.deck = deck));

    this.deckbuilderService.initialSelection.subscribe(
      initialSelection => (this.initialSelection = initialSelection)
    );

    this.form = this.formBuilder.group({
      name: ""
    });
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

  saveDeck(): void {
    if (localStorage.getItem("currentUser")) {
      const name =
        this.deck.leader && !this.name.value
          ? this.deck.leader.name["en-US"]
          : this.name.value;

      this.isValidDeck = this.deckbuilderService.saveDeck(name);
    } else {
      console.log("No user logged in.");
    }
  }

  toggleFaction(): void {
    console.log("Faction toggled. ;)");
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

  get name() {
    return this.form.get("name");
  }

  // test
  getDeckTest() {
    console.log("Got list deck right here: ", this.deck);
  }
}
