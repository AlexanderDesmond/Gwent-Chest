import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardsListComponent } from "./cards-list/cards-list.component";
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [CardsListComponent, CardComponent],
  imports: [CommonModule],
  exports: [CardsListComponent]
})
export class CardsModule {}
