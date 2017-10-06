/**
 * SignInComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    public isLoading: boolean;
    public signInForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private sasaki: SasakiService,
        private router: Router
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
        try {
            const result = await this.sasaki.auth.signIn();
            this.sasaki.credentials = result;
            this.isLoading = true;
            this.router.navigate(['/']);
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

}
