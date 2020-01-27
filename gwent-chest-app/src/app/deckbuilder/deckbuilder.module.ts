import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeckbuilderComponent } from "./deckbuilder/deckbuilder.component";
import { CardsModule } from "../cards/cards.module";
import { DeckComponent } from "./deck/deck.component";
import { CardsListComponent } from "./cards-list/cards-list.component";
import { CardComponent } from "./card/card.component";

@NgModule({
  declarations: [
    DeckbuilderComponent,
    DeckComponent,
    CardsListComponent,
    CardComponent
  ],
  imports: [CommonModule, CardsModule],
  exports: [DeckbuilderComponent]
})
export class DeckbuilderModule {}
