import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { DeckbuilderModule } from "./deckbuilder/deckbuilder.module";
import { DeckModule } from "./deck/deck.module";
import { DeckService } from "./core/services/deck.service";
import { AuthenticationModule } from "./authentication/authentication.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./angular-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "./shared/shared.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CatalogueModule } from "./catalogue/catalogue.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    DeckbuilderModule,
    DeckModule,
    CatalogueModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule
  ],
  providers: [DeckService],
  bootstrap: [AppComponent]
})
export class AppModule {}
