import { Component, OnInit, Input } from "@angular/core";
import { CardService } from "src/app/core/services/card.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() card;
  @Input() key;

  constructor(private cardService: CardService) {}

  ngOnInit() {}

  getCardColour(card) {
    return this.cardService.getCardColour(card);
  }
}
