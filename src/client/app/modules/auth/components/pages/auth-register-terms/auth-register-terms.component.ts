import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CinerinoService } from '../../../../../services';

@Component({
    selector: 'app-auth-register-terms',
    templateUrl: './auth-register-terms.component.html',
    styleUrls: ['./auth-register-terms.component.scss']
})
export class AuthRegisterTermsComponent implements OnInit {

    public isLoading: boolean;
    public termsForm: FormGroup;

    constructor(
        private cinerino: CinerinoService,
        private formBuilder: FormBuilder
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.isLoading = false;
        this.termsForm = this.formBuilder.group({
            terms: [false, [Validators.requiredTrue]]
        });
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
        try {
            await this.cinerino.signUp();
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
