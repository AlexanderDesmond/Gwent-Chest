import { Component, OnInit } from "@angular/core";

// Testing
import Cards from "../../../assets/gwent-data-release/cards.json";

import { CardService } from "src/app/core/services/card.service";

@Component({
  selector: "app-cards-list",
  templateUrl: "./cards-list.component.html",
  styleUrls: ["./cards-list.component.scss"]
})
export class CardsListComponent implements OnInit {
  cards = Cards;
  cardKeys;

  card: object;

  constructor(private cardService: CardService) {
    this.cardKeys = Object.keys(this.cards);
  }

  ngOnInit() {
    this.cardService.currentCard.subscribe(card => (this.card = card));
  }

  selectCard(card) {
    console.log(card);

    this.cardService.addCard(card);
  }
}
