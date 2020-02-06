import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

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

  onSubmit() {
    console.log("starting registration process");
    this.authService
      .register(this.username.value, this.email.value, this.password.value)
      .subscribe(
        data => {
          console.log("User: " + localStorage.getItem("currentUser"));
          this.router.navigate(["/login"]);
        },
        error => {
          console.log("Error: ", error.message);
        }
      );
    this.authService.test().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      }
    );
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
