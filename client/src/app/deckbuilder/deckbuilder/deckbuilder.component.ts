import { Component, OnInit } from "@angular/core";
import { Deck } from "src/app/core/models/deck";

@Component({
  selector: "app-deckbuilder",
  templateUrl: "./deckbuilder.component.html",
  styleUrls: ["./deckbuilder.component.scss"]
})
export class DeckbuilderComponent implements OnInit {
  deck: Deck;

  constructor() {}

  ngOnInit() {}
}
