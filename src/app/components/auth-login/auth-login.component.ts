import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    console.log('LoginComponent constructor');
  }

  public ngOnInit() {
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

  public submit(event: Event) {
    event.preventDefault();
    console.log(this.loginForm);
  }
}
