import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  currentUser: String;

  isOpened: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.authService.getLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn === true;
      this.currentUser = this.authService.getCurrentUser();
    });
  }

  onClick(): void {
    if (this.isLoggedIn) {
      this.authService.logout();
    } else {
      this.router.navigate(["/login"]);
    }

    this.isOpened = !this.isOpened;
  }
}
