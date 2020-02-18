import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeckbuilderComponent } from "./deckbuilder/components/deckbuilder/deckbuilder.component";
import { RegistrationComponent } from "./authentication/components/registration/registration.component";
import { LoginComponent } from "./authentication/components/login/login.component";
import { CatalogueComponent } from "./catalogue/components/catalogue/catalogue.component";
import { DeckViewComponent } from "./deck/components/deck-view/deck-view.component";

const routes: Routes = [
  { path: "", component: CatalogueComponent },
  { path: "deck/:id", component: DeckViewComponent },
  { path: "deckbuilder", component: DeckbuilderComponent },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
