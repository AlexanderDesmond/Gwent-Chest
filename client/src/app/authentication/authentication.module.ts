import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../angular-material.module";

@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule]
})
export class AuthenticationModule {}
