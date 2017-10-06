/**
 * SignInComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLoginService } from '../../service/user-login/user-login.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
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
            user: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });
    }

    public async signIn() {
        this.isLoading = true;
        this.error = null;
        const authenticateResult = await this.userLogin.authenticate(
            this.signInForm.controls.user.value,
            this.signInForm.controls.password.value
        );
        if (authenticateResult.message != null) {
            this.error = new Error(authenticateResult.message);
            console.log('result', this.error);
            this.isLoading = false;
        } else {
            this.router.navigate(['/']);
        }
    }

}
