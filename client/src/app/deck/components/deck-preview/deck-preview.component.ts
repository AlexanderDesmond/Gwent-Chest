import { Component, OnInit, Input } from "@angular/core";
import { CardService } from "src/app/core/services/card.service";

@Component({
  selector: "app-deck-preview",
  templateUrl: "./deck-preview.component.html",
  styleUrls: ["./deck-preview.component.scss"]
})
export class DeckPreviewComponent implements OnInit {
  @Input() deck;

  constructor() {}

  ngOnInit(): void {}

  getDeckColour(faction) {
    let colour;

    switch (faction) {
      case "Neutral":
        colour = "rgb(40, 30, 15)";
        break;
      case "Northern Realms":
        colour = "rgb(5, 25, 70)";
        break;
      case "Syndicate":
        colour = "rgb(55, 20, 5)";
        break;
      case "Skellige":
        colour = "rgb(30, 30, 50)";
        break;
      case "Scoiatael":
        colour = "rgb(45, 45, 10)";
        break;
      case "Nilfgaard":
        colour = "rgb(15, 20, 20)";
        break;
      case "Monster":
        colour = "rgb(64, 12, 4)";
        break;
      default:
        colour = "white";
        break;
    }

    return colour;
  }

  formatDate(date) {}
}
