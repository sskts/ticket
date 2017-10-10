/**
 * ForgotPasswordResetComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CognitoCallback } from '../../../service/cognito/cognito.service';
import { UserLoginService } from '../../../service/user-login/user-login.service';

@Component({
    selector: 'app-forgot-password-reset',
    templateUrl: './forgot-password-reset.component.html',
    styleUrls: ['./forgot-password-reset.component.scss']
})
export class ForgotPasswordResetComponent implements OnInit, CognitoCallback {
    public isLoading: boolean;
    public userName: string;
    public forgotPasswordResetForm: FormGroup;
    public error: Error | null;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userLogin: UserLoginService
    ) { }

    public ngOnInit() {
        this.isLoading = false;
        this.error = null;
        this.forgotPasswordResetForm = this.formBuilder.group({
            verificationCode: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[0-9]+$/)
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ])
        });
        this.route.params.subscribe(params => {
            this.userName = params.userName;
        });
    }

    public changePassword() {
        this.isLoading = true;
        this.error = null;
        this.userLogin.confirmNewPassword(
            this.userName,
            this.forgotPasswordResetForm.controls.verificationCode.value,
            this.forgotPasswordResetForm.controls.password.value,
            this
        );
    }

    public cognitoCallback(message: string) {
        if (message !== null) {
            this.error = new Error(message);
            console.log('message', this.error.message);
            this.isLoading = false;
        } else {
            this.router.navigate(['/auth/signIn']);
        }
    }

}
