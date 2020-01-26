import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeckbuilderComponent } from "./deckbuilder/deckbuilder.component";
import { CardsModule } from "../cards/cards.module";
import { DeckComponent } from './deck/deck.component';

@NgModule({
  declarations: [DeckbuilderComponent, DeckComponent],
  imports: [CommonModule, CardsModule],
  exports: [DeckbuilderComponent]
})
export class DeckbuilderModule {}
