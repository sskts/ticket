/**
 * ProfileComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private user: UserService
  ) {
    console.log('LoginComponent constructor');
  }

  public ngOnInit() {
    this.updateForm = this.formBuilder.group({
      mail: new FormControl(this.user.contacts.email, [
        Validators.required,
        Validators.maxLength(10),
        Validators.email
      ]),
      givenName: new FormControl(this.user.contacts.givenName, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[ぁ-ゞー]+$/)
      ]),
      familyName: new FormControl(this.user.contacts.familyName, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[ぁ-ゞー]+$/)
      ]),
      phoneNumber: new FormControl(this.user.contacts.telephone, [
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
