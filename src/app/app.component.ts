import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly _authService: AuthService) {}

  ngOnInit() {}

  public isAuthenticated() {
    return this._authService.isAuthenticated();
  }
}
