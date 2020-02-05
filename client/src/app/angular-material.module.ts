import { NgModule } from "@angular/core";

// Layout
import { MatCardModule } from "@angular/material/card";

// Buttons
import { MatButtonModule } from "@angular/material/button";

// Forms
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  exports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule]
})
export class MaterialModule {}
