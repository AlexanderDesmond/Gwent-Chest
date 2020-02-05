import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9]*"),
          Validators.minLength(4)
        ]
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  get username() {
    return this.form.get("username");
  }

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }
}
