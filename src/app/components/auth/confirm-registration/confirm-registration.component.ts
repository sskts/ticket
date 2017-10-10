/**
 * ConfirmRegistrationComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CognitoCallback } from '../../../service/cognito/cognito.service';
import { UserRegistrationService } from '../../../service/user-registration/user-registration.service';

@Component({
    selector: 'app-confirm-registration',
    templateUrl: './confirm-registration.component.html',
    styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit, CognitoCallback {
    public isLoading: boolean;
    public confirmRegistrationForm: FormGroup;
    public userName: string;
    public error: Error | null;

    constructor(
        private formBuilder: FormBuilder,
        private userRegistration: UserRegistrationService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit() {
        this.error = null;
        this.confirmRegistrationForm = this.formBuilder.group({
            confirmationCode: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[0-9]+$/)
            ])
        });
        this.activatedRoute.params.subscribe((params) => {
            return this.userName = params.userName;
        });
    }

    public confirmRegistration() {
        this.isLoading = true;
        this.error = null;
        this.userRegistration.confirmRegistration(
            this.userName,
            this.confirmRegistrationForm.controls.confirmationCode.value,
            this
        );
    }

    public cognitoCallback(message: string, result: any) {
        if (message != null) {
            this.error = new Error(message);
            console.log('message', this.error.message);
            this.isLoading = false;
        } else {
            // move to the next step
            console.log('Moving to securehome', result);
            this.router.navigate(['/']);
        }
    }
}
