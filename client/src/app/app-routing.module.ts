import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeckbuilderComponent } from "./deckbuilder/components/deckbuilder/deckbuilder.component";
import { RegistrationComponent } from "./authentication/components/registration/registration.component";
import { LoginComponent } from "./authentication/components/login/login.component";

const routes: Routes = [
  { path: "", component: DeckbuilderComponent },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
