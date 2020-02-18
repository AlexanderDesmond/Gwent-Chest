import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeckbuilderComponent } from "./components/deckbuilder/deckbuilder.component";
import { CardComponent } from "./components/card/card.component";

import { MaterialModule } from "../angular-material.module";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DeckModule } from "../deck/deck.module";

@NgModule({
  declarations: [DeckbuilderComponent, CardComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DeckModule
  ],
  exports: [DeckbuilderComponent]
})
export class DeckbuilderModule {}
