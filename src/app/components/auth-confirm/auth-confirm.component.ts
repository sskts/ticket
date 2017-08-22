/**
 * 確認コンポーネント
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-confirm',
  templateUrl: './auth-confirm.component.html',
  styleUrls: ['./auth-confirm.component.scss']
})
export class AuthConfirmComponent implements OnInit {
  public cnfirmForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    console.log('LoginComponent constructor');
  }

  public ngOnInit() {
    this.cnfirmForm = this.formBuilder.group({
      confirmationCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ])
    });
  }

  public submit() {
    console.log(this.cnfirmForm);
  }

}
