import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeckComponent } from "./components/deck/deck.component";
import { DeckPreviewComponent } from "./components/deck-preview/deck-preview.component";
import { DeckViewComponent } from './components/deck-view/deck-view.component';

@NgModule({
  declarations: [DeckComponent, DeckPreviewComponent, DeckViewComponent],
  imports: [CommonModule],
  exports: [DeckComponent, DeckPreviewComponent]
})
export class DeckModule {}
