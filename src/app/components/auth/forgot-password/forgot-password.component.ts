/**
 * ForgotPasswordComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CognitoCallback } from '../../../service/cognito/cognito.service';
import { UserLoginService } from '../../../service/user-login/user-login.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, CognitoCallback {
    public isLoading: boolean;
    public forgotPasswordForm: FormGroup;
    public error: Error | null;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        public userLogin: UserLoginService
    ) { }

    public ngOnInit() {
        this.isLoading = false;
        this.error = null;
        this.forgotPasswordForm = this.formBuilder.group({
            userName: new FormControl('', [
                Validators.required
            ])
        });
    }

    public async sendVerificationCode() {
        this.isLoading = true;
        this.userLogin.forgotPassword(
            this.forgotPasswordForm.controls.userName.value,
            this
        );
    }

    public cognitoCallback(message: string, result: any) {
        if (message == null && result == null) {
            this.router.navigate([
                '/auth/forgotPasswordReset',
                this.forgotPasswordForm.controls.userName.value
            ]);
        } else {
            this.error = new Error(message);
            this.isLoading = false;
        }
    }
}
