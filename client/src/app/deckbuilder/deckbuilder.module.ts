import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeckbuilderComponent } from "./components/deckbuilder/deckbuilder.component";
import { CardComponent } from "./components/card/card.component";

import { DeckComponent } from "../deck/components/deck/deck.component";

@NgModule({
  declarations: [DeckbuilderComponent, CardComponent, DeckComponent],
  imports: [CommonModule],
  exports: [DeckbuilderComponent]
})
export class DeckbuilderModule {}
