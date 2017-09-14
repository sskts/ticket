/**
 * AuthLoginComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  public isLoading: boolean;

  constructor(
    private sasaki: SasakiService,
    private router: Router
  ) {
    console.log('LoginComponent constructor');
  }

  public ngOnInit() {
    this.isLoading = false;
  }

  public async login() {
    this.isLoading = true;
    try {
      const result = await this.sasaki.auth.signIn();
      console.log('authorize result:', result);
      this.sasaki.credentials = result;
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      this.isLoading = false;
    }
  }

  public async logout() {
    try {
      await this.sasaki.auth.signOut();
      console.log('logout');
      this.sasaki.credentials = null;
    } catch (error) {
      console.error(error);
    }
  }
}
