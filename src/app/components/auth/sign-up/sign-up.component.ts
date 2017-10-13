/**
 * SignUpComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
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
        private formBuilder: FormBuilder
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
    }

}
