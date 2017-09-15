/**
 * ProfileComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    console.log('LoginComponent constructor');
  }

  public ngOnInit() {
    this.updateForm = this.formBuilder.group({
      mail: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.email
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
    console.log(this.updateForm);
  }

}
