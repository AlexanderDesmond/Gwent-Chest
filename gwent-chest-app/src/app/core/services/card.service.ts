import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CardService {
  private cardSource = new BehaviorSubject<object>(null);
  currentCard = this.cardSource.asObservable();

  constructor() {}

  addCard(card: object) {
    this.cardSource.next(card);

    console.log("Selected card: ", card);
  }

  getCardColour(card) {
    let colour;

    switch (card.faction) {
      case "Neutral":
        colour = "SaddleBrown";
        break;
      case "Northern Realms":
        colour = "blue";
        break;
      case "Syndicate":
        colour = "orange";
        break;
      case "Skellige":
        colour = "purple";
        break;
      case "Scoiatael":
        colour = "green";
        break;
      case "Nilfgaard":
        colour = "black";
        break;
      case "Monster":
        colour = "red";
        break;
      default:
        colour = "white";
        break;
    }

    return colour;
  }
}
