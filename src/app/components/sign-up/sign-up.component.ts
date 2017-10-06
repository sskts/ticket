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
    public updateForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {
        console.log('SignUpComponent constructor');
    }

    public ngOnInit() {
        this.isLoading = false;
        this.updateForm = this.formBuilder.group({
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
                Validators.pattern(/^[0-9]+$/)
            ])
        });
    }

    public async signUp() {
        this.isLoading = true;
        this.isLoading = false;
    }

}
