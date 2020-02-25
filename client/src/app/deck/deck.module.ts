import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeckComponent } from "./components/deck/deck.component";
import { DeckPreviewComponent } from "./components/deck-preview/deck-preview.component";
import { DeckViewComponent } from "./components/deck-view/deck-view.component";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../angular-material.module";

@NgModule({
  declarations: [DeckComponent, DeckPreviewComponent, DeckViewComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [DeckComponent, DeckPreviewComponent]
})
export class DeckModule {}
