/**
 * SignUpComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CognitoCallback } from '../../../service/cognito/cognito.service';
import { UserRegistrationService } from '../../../service/user-registration/user-registration.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, CognitoCallback {
    public isLoading: boolean;
    public signUpForm: FormGroup;
    public registrationUser: {
        username: string;
        password: string;
        email: string;
        givenName: string;
        familyName: string;
        phoneNumber: string;
    };
    public error: Error | null;

    constructor(
        private formBuilder: FormBuilder,
        private userRegistration: UserRegistrationService,
        private router: Router
    ) {
        console.log('SignUpComponent constructor');
    }

    public ngOnInit() {
        this.isLoading = false;
        this.error = null;
        this.signUpForm = this.formBuilder.group({
            userName: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ]),
            mail: new FormControl('', [
                Validators.required,
                Validators.maxLength(30),
                Validators.email
            ]),
            givenName: new FormControl('', [
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(/^[ぁ-ゞー]+$/)
            ]),
            familyName: new FormControl('', [
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(/^[ぁ-ゞー]+$/)
            ]),
            telephone: new FormControl('', [
                Validators.required,
                Validators.maxLength(15),
                Validators.pattern(/^\+?[1-9]\d{1,14}$/)
            ])
        });
    }

    public async signUp() {
        this.isLoading = true;
        this.registrationUser = {
            username: this.signUpForm.controls.userName.value,
            password: this.signUpForm.controls.password.value,
            email: this.signUpForm.controls.mail.value,
            familyName: this.signUpForm.controls.familyName.value,
            givenName: this.signUpForm.controls.givenName.value,
            phoneNumber: this.signUpForm.controls.telephone.value
        };
        this.userRegistration.register(this.registrationUser, this);
    }

    /**
     * 会員登録後の遷移
     * @param message 登録失敗時のメッセージ
     * @param result 登録成功時の結果
     */
    public cognitoCallback(message: string, result: any) {
        if (message != null) {
            this.error = new Error(message);
            console.log('result:', this.error.message);
            this.isLoading = false;
        } else {
            // move to the next step
            this.router.navigate(['/auth/confirmRegistration', result.user.username]);
        }
    }

}
