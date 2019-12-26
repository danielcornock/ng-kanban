import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { RouterService } from "src/app/shared/router/router.service";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  private readonly _formBuilder: FormBuilder;
  private readonly _httpService: HttpService;
  private readonly _router: RouterService;
  private readonly _authService: AuthService;

  constructor(
    formBuilder: FormBuilder,
    httpService: HttpService,
    router: RouterService,
    authService: AuthService
  ) {
    this._formBuilder = formBuilder;
    this._httpService = httpService;
    this._router = router;
    this._authService = authService;
  }

  public ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  public login(): void {
    if (!this.loginForm.valid) {
      //TODO Add pop up message
      console.error("Form Not Valid!");
      return;
    }

    this._httpService.post("auth/login", this.loginForm.value).then(res => {
      this._authService.setJwt(res.jwt);
      this._router.navigate("home");
    });
  }
}
