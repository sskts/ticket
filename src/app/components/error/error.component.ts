/**
 * ErrorComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AwsCognitoService } from '../../service/aws-cognito/aws-cognito.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        private router: Router,
        private awsCognito: AwsCognitoService
    ) { }

    public ngOnInit() {
    }

    public async connect() {
        this.isLoading = true;
        try {
            await this.awsCognito.authenticateWithTerminal();
            if (!this.awsCognito.isAuthenticate()) {
                throw new Error('isAuthenticate is false');
            }
            this.router.navigate(['/']);
        } catch (err) {
            console.log(err);
        }
        this.isLoading = false;
    }

}
