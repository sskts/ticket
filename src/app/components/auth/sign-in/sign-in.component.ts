/**
 * SignInComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CognitoCallback } from '../../../service/cognito/cognito.service';
import { UserLoginService } from '../../../service/user-login/user-login.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, CognitoCallback {
    public isLoading: boolean;
    public signInForm: FormGroup;
    public error: Error;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userLogin: UserLoginService
    ) {
        console.log('LoginComponent constructor');
    }

    public ngOnInit() {
        this.isLoading = false;
        this.signInForm = this.formBuilder.group({
            userName: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ])
        });
    }

    public async signIn() {
        this.isLoading = true;
        this.error = null;
        const authenticateResult = await this.userLogin.authenticate(
            this.signInForm.controls.userName.value,
            this.signInForm.controls.password.value
        );
        console.log('authenticateResult', authenticateResult);
        this.cognitoCallback(authenticateResult.message, authenticateResult.result);
    }

    /**
     * 会員登録後の遷移
     * @param message 登録失敗時のメッセージ
     * @param result 登録成功時の結果
     */
    public cognitoCallback(message: string, result: any) {
        if (message != null) {
            this.error = new Error(message);
            console.log('result', this.error);
            this.isLoading = false;
        } else {
            // move to the next step
            console.log('result', result);
            this.router.navigate(['/']);
        }
    }

}
