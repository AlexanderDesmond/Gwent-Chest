import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { MaterialModule } from "../angular-material.module";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { FilterCardsPipe } from "./pipes/filter-cards.pipe";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FilterDeckPipe } from "./pipes/filter-deck.pipe";

@NgModule({
  declarations: [HeaderComponent, FilterCardsPipe, FilterDeckPipe],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [HeaderComponent, FilterCardsPipe, FilterDeckPipe]
})
export class SharedModule {}
