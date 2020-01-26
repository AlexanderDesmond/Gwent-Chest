import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CardService {
  private cardSource = new BehaviorSubject<object>({});
  currentCard = this.cardSource.asObservable();

  constructor() {}

  addCard(card: object) {
    this.cardSource.next(card);

    console.log("Selected card: ", card);
  }
}
