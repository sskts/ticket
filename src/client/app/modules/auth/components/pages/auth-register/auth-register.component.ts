import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStatus } from 'aws-sdk/clients/kinesisanalytics';
import { UtilService } from '../../../../../services';

@Component({
    selector: 'app-auth-register',
    templateUrl: './auth-register.component.html',
    styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent implements OnInit {
    public applicationStatus?: ApplicationStatus;

    constructor(private utilService: UtilService, private router: Router) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            const { status } = await this.utilService.getApplicationStatus();
            this.applicationStatus = status;
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error', { redirect: '/auth/register' }]);
        }
    }
}
