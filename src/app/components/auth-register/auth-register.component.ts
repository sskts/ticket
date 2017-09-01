/**
 * AuthRegisterComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    console.log('LoginComponent constructor');
  }

  public ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      mail: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      givenName: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      familyName: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/)
      ])
    });
  }

  public submit() {
    console.log(this.registerForm);
  }

}
