import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CatalogueComponent } from "./components/catalogue/catalogue.component";
import { DeckModule } from "../deck/deck.module";

@NgModule({
  declarations: [CatalogueComponent],
  imports: [CommonModule, DeckModule]
})
export class CatalogueModule {}
