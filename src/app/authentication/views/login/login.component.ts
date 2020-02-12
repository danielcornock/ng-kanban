import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/api/http-service/http.service';
import { RouterService } from 'src/app/shared/router/router.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormFactory } from 'src/app/shared/forms/services/form-factory/form-factory.service';
import { FormContainer } from 'src/app/shared/forms/form-container/form-container';
import { IControlExport } from 'src/app/shared/forms/interfaces/control-export.interface';
import { IUserLoginCredentials } from '../../interfaces/user-login-credentials.interface';
import { formInputTypes } from 'src/app/shared/forms/constants/form-input-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formContainer: FormContainer;
  private _userCredentials: IUserLoginCredentials;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _router: RouterService,
    private readonly _authService: AuthService,
    private readonly _formFactory: FormFactory
  ) {}

  public ngOnInit(): void {
    this._userCredentials = {} as IUserLoginCredentials;
    this.formContainer = this._formFactory.createForm({
      fields: [
        {
          name: 'email',
          type: formInputTypes.EMAIL,
          config: {
            required: true,
            customValidators: [Validators.email],
            setValue: (result: IControlExport) => {
              this._userCredentials.email = result.value;
            }
          }
        },
        {
          name: 'password',
          type: formInputTypes.PASSWORD,
          config: {
            required: true,
            setValue: (result: IControlExport) => {
              this._userCredentials.password = result.value;
            }
          }
        }
      ]
    });
  }

  public login(): void {
    this._httpService.post('auth/login', this._userCredentials).then(res => {
      this._authService.setJwt(res.jwt);
      this._router.navigate('home');
    });
  }
}
