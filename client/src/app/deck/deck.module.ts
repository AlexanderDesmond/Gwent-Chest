import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeckComponent } from "./components/deck/deck.component";
import { DeckPreviewComponent } from "./components/deck-preview/deck-preview.component";

@NgModule({
  declarations: [DeckComponent, DeckPreviewComponent],
  imports: [CommonModule],
  exports: [DeckComponent, DeckPreviewComponent]
})
export class DeckModule {}
