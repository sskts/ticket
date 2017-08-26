/**
 * ログインコンポーネント
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public mail: FormControl;
  public isSignedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sasakiService: SasakiService,
    private router: Router
  ) {
    console.log('LoginComponent constructor');
  }

  public ngOnInit() {
    console.log('sasakiService', this.sasakiService);
    this.isSignedIn = false;
    this.loginForm = this.formBuilder.group({
      mail: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ])
    });
  }

  public async submit() {
    console.log(this.loginForm);
  }

  public async login() {
    try {
      const result = await this.sasakiService.auth.signIn();
      console.log('authorize result:', result);
      this.sasakiService.credentials = result;
      this.isSignedIn = true;

      const creditCards = await this.sasakiService.people.findCreditCards({
        personId: 'me'
      });
      console.log('creditCards:', creditCards);
      localStorage.setItem('auth', JSON.stringify(result));
      this.router.navigate(['/ticket-holder']);
    } catch (error) {
      console.error(error);
    }
  }

  public async logout() {
    try {
      await this.sasakiService.auth.signOut();
      console.log('logout');
      this.sasakiService.credentials = null;
      this.isSignedIn = false;
    } catch (error) {
      console.error(error);
    }
  }
}
