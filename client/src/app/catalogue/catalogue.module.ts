import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CatalogueComponent } from "./components/catalogue/catalogue.component";
import { DeckModule } from "../deck/deck.module";
import { MaterialModule } from "../angular-material.module";
import { DeckTableComponent } from "./components/deck-table/deck-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [CatalogueComponent, DeckTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DeckModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ]
})
export class CatalogueModule {}
