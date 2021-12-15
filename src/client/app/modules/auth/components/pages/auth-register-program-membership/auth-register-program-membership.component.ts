import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import {
    SellerService,
    UserService,
    UtilService,
} from '../../../../../services';

@Component({
    selector: 'app-auth-register-program-membership',
    templateUrl: './auth-register-program-membership.component.html',
    styleUrls: ['./auth-register-program-membership.component.scss'],
})
export class AuthRegisterProgramMembershipComponent implements OnInit {
    public isLoading: boolean;
    public optionsForm: FormGroup;
    public theaters: factory.chevre.seller.ISeller[];

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private sellerService: SellerService,
        private utilService: UtilService,
        private userService: UserService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        this.optionsForm = this.createForm();
        try {
            this.theaters = await this.sellerService.search(
                {},
                { exclude: true, sort: true }
            );
        } catch (err) {
            console.log(err);
            this.router.navigate([
                '/error',
                { redirect: '/auth/register/credit' },
            ]);
        }
        this.isLoading = false;
    }

    /**
     * フォーム作成
     * @method createForm
     */
    private createForm() {
        return this.formBuilder.group({
            theater: ['', [Validators.required]],
        });
    }

    /**
     * フォーム確定
     * @method onSubmit
     */
    public async onSubmit() {
        this.isLoading = true;
        if (this.optionsForm.invalid) {
            // フォームのステータス変更
            this.optionsForm.controls.theater.markAsTouched();
            this.isLoading = false;
            return;
        }
        try {
            const theaterBranchCode = this.optionsForm.controls.theater.value;
            const programMembershipRegistered =
                this.userService.data.programMembershipRegistered;
            const isRegister =
                await this.userService.isRegisterProgramMembership({
                    intervalTime: 0,
                    limitCount: 0,
                });
            if (!isRegister) {
                // 会員登録
                await this.userService.registerProgramMembership({
                    programMembershipRegistered,
                    theaterBranchCode,
                });
                return;
            }

            this.router.navigate(['/']);
        } catch (err) {
            console.error(err);
            // 会員プログラム登録失敗
            this.isLoading = false;
            this.utilService.openAlert({
                title: 'エラーが発生しました',
                body: `再度ご登録してください。`,
            });
        }
    }
}
