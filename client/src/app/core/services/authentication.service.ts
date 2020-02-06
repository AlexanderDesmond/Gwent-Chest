import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  // Used to record whether the user is logged-in or not.
  getLoggedIn = new BehaviorSubject(this.getCurrentUser() !== null);

  constructor(private http: HttpClient) {
    // Sets the value to true if the user is logged-in, set the value to false otherwise.
    this.getLoggedIn.next(localStorage.getItem("currentUser") !== null);
  }

  // Returns username of logged-in user.
  getCurrentUser(): String {
    return localStorage.getItem("currentUser");
  }

  // Returns the logged-in user's JSON Web Token.
  getToken(): String {
    return localStorage.getItem("loginToken");
  }

  //test
  test() {
    return this.http.get("/api/users");
  }
  // test

  // Calls the login endpoint in the api, and stores the username and token into local storage.
  login(username: string, password: string) {
    return this.http.post("/api/login/", { username, password }).pipe(
      map(response => {
        // Store user data.
        localStorage.setItem("loginToken", response["token"]);
        localStorage.setItem("currentUser", response["user"].username);
        this.getLoggedIn.next(true);
      })
    );
  }

  // Retrieve token.
  refreshToken() {
    return this.http.get("api/refreshtoken").subscribe(
      response => {
        if (response["auth"] === true) {
          localStorage.setItem("loginToken", response["token"]);
          localStorage.setItem("currentUser", response["user"].username);
          this.getLoggedIn.next(true);
        } else {
          this.logout();
        }
      },
      error => {
        this.logout();
      }
    );
  }

  // Clear the local storage and set the user as logged-out.
  logout() {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("currentUser");
    this.getLoggedIn.next(false);
  }
}
