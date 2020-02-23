import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DeckService } from "src/app/core/services/deck.service";

@Component({
  selector: "app-deck-view",
  templateUrl: "./deck-view.component.html",
  styleUrls: ["./deck-view.component.scss"]
})
export class DeckViewComponent implements OnInit {
  deck;
  id: string;

  upvote: boolean;
  downvote: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getDeck();
  }

  ngOnInit(): void {}

  getDeck() {
    this.deckService.getDeck(this.id).subscribe(data => {
      this.deck = data;
      console.log(this.deck);
    });
  }
}
