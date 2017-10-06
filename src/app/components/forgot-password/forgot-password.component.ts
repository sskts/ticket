/**
 * ForgotPasswordComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    public isLoading: boolean;
    public signInForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {
        console.log('LoginComponent constructor');
    }

    public ngOnInit() {
        this.isLoading = false;
        this.signInForm = this.formBuilder.group({
            user: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });
    }

    public async resetPassword() {

    }

}
