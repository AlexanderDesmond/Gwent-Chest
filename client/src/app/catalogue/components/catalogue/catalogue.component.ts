import { Component, OnInit } from "@angular/core";
import { DeckService } from "src/app/core/services/deck.service";

@Component({
  selector: "app-catalogue",
  templateUrl: "./catalogue.component.html",
  styleUrls: ["./catalogue.component.scss"]
})
export class CatalogueComponent implements OnInit {
  deckList;

  constructor(private deckService: DeckService) {
    //this.deckService.getCatalogue().subscribe(data => (this.deckList = data));
    this.deckList = this.deckService.getCatalogue();
  }

  ngOnInit(): void {}
}
