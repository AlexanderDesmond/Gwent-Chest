import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeckbuilderComponent } from "./deckbuilder/deckbuilder/deckbuilder.component";

const routes: Routes = [{ path: "", component: DeckbuilderComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
