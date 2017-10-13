/**
 * ConfirmRegistrationComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-confirm-registration',
    templateUrl: './confirm-registration.component.html',
    styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {
    public isLoading: boolean;
    public confirmRegistrationForm: FormGroup;
    public userName: string;
    public error: Error | null;

    constructor(
        private formBuilder: FormBuilder,
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
    }
}
