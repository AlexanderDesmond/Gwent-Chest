import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeckbuilderComponent } from "./components/deckbuilder/deckbuilder.component";
import { CardComponent } from "./components/card/card.component";

import { DeckComponent } from "../deck/components/deck/deck.component";
import { MaterialModule } from "../angular-material.module";

@NgModule({
  declarations: [DeckbuilderComponent, CardComponent, DeckComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DeckbuilderComponent]
})
export class DeckbuilderModule {}
