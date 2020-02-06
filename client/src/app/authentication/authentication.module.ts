import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../angular-material.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ]
})
export class AuthenticationModule {}
