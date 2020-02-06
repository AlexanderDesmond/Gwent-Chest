import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  isLoggedIn: boolean;
  currentUser: String;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit() {
    this.authService.getLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn === true;
      this.currentUser = this.authService.getCurrentUser();
    });

    this.form = this.formBuilder.group({
      username: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9]*"),
          Validators.minLength(4)
        ]
      ],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    console.log("starting login process");
    this.authService.login(this.username.value, this.password.value).subscribe(
      data => {
        console.log("User: " + localStorage.getItem("currentUser"));
        this.router.navigate(["/"]);
      },
      error => {
        console.log(error.message);
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

  get password() {
    return this.form.get("password");
  }
}
