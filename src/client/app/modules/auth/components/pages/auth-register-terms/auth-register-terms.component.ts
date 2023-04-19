import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationStatus } from '../../../../../models/util';
import { SmartTheaterService, UtilService } from '../../../../../services';

@Component({
    selector: 'app-auth-register-terms',
    templateUrl: './auth-register-terms.component.html',
    styleUrls: ['./auth-register-terms.component.scss'],
})
export class AuthRegisterTermsComponent implements OnInit {
    public isLoading: boolean;
    public termsForm: FormGroup;
    public applicationStatus?: ApplicationStatus;

    constructor(
        private smartTheaterService: SmartTheaterService,
        private utilService: UtilService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            this.isLoading = false;
            this.termsForm = this.formBuilder.group({
                terms: [false, [Validators.requiredTrue]],
            });
            const { status } = await this.utilService.getApplicationStatus();
            this.applicationStatus = status;
        } catch (error) {
            console.error(error);
            this.router.navigate([
                '/error',
                { redirect: '/auth/register/terms' },
            ]);
        }
    }

    /**
     * フォーム確定
     * @method onSubmit
     */
    public async onSubmit() {
        this.isLoading = true;
        if (this.termsForm.invalid) {
            this.termsForm.controls.terms.markAsDirty();
            this.isLoading = false;
            return;
        }
        const { status } = await this.utilService.getApplicationStatus();
        if (status !== ApplicationStatus.NO_RELEASE) {
            this.utilService.openConfirm({
                title: '会員登録は終了しました',
                body: '',
                cb: () => {
                    this.router.navigate(['/']);
                },
                next: 'TOPへ戻る',
            });
            return;
        }
        try {
            await this.smartTheaterService.signUp();
        } catch (error) {
            this.isLoading = false;
            console.error(error);
        }
    }

    /**
     * 戻る
     */
    public prev() {
        window.history.back();
    }
}
