import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { CardsModule } from "./cards/cards.module";
import { DeckbuilderModule } from "./deckbuilder/deckbuilder.module";
import { CoreModule } from "./core/core.module";
import { DeckService } from "./core/services/deck.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CardsModule,
    DeckbuilderModule
  ],
  providers: [DeckService],
  bootstrap: [AppComponent]
})
export class AppModule {}
