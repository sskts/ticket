/**
 * ログインコンポーネント
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

  constructor(
    private sasaki: SasakiService,
    private router: Router
  ) {
    console.log('LoginComponent constructor');
  }

  public async ngOnInit() {
    await this.login();
  }

  public async login() {
    try {
      const result = await this.sasaki.auth.signIn();
      console.log('authorize result:', result);
      this.sasaki.credentials = result;
    } catch (error) {
      console.error(error);
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
