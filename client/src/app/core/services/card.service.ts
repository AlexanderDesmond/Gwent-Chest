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
}
