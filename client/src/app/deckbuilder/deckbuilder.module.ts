import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeckbuilderComponent } from "./components/deckbuilder/deckbuilder.component";
import { CardComponent } from "./components/card/card.component";

import { DeckComponent } from "../deck/components/deck/deck.component";
import { MaterialModule } from "../angular-material.module";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [DeckbuilderComponent, CardComponent, DeckComponent],
  imports: [CommonModule, SharedModule, MaterialModule, FormsModule],
  exports: [DeckbuilderComponent]
})
export class DeckbuilderModule {}
