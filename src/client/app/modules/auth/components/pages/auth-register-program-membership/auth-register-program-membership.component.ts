import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { CinerinoService, MasterService, MemberService, UserService, UtilService } from '../../../../../services';

@Component({
    selector: 'app-auth-register-program-membership',
    templateUrl: './auth-register-program-membership.component.html',
    styleUrls: ['./auth-register-program-membership.component.scss']
})
export class AuthRegisterProgramMembershipComponent implements OnInit {
    public isLoading: boolean;
    public optionsForm: FormGroup;
    public theaters: factory.chevre.seller.ISeller[];

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private cinerino: CinerinoService,
        private member: MemberService,
        private masterService: MasterService,
        private utilService: UtilService,
        private userService: UserService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        this.optionsForm = this.createForm();
        try {
            this.theaters = await this.masterService.searchSeller(
                {},
                { exclude: true, sort: true }
            );
        } catch (err) {
            console.log(err);
            this.router.navigate(['/error', { redirect: '/auth/register/credit' }]);
        }
        this.isLoading = false;
    }

    /**
     * フォーム作成
     * @method createForm
     */
    private createForm() {
        return this.formBuilder.group({
            theater: ['', [Validators.required]]
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
            const accounts = this.userService.data.accounts;
            if (accounts.length > 1) {
                // ポイントアカウントが複数存在する場合、最初の一件を残してクローズする
                for (let i = 1; i < accounts.length; i++) {
                    await this.cinerino.ownerShipInfo.closeAccount({
                        accountNumber: accounts[i].typeOfGood.accountNumber
                    });
                }
            }
            const theaterBranchCode = this.optionsForm.controls.theater.value;
            const programMembershipRegistered = this.userService.data.programMembershipRegistered;
            const pointAwardAccount = {
                accountNumber: accounts[0].typeOfGood.accountNumber
            };
            const creditCard = {
                memberId: 'me',
                cardSeq: Number(this.userService.data.creditCards[0].cardSeq)
            };
            let isRegister = await this.member.isRegister({ interval: 0, limit: 0 });
            if (!isRegister) {
                // 会員登録
                await this.member.registerProgramMembership({
                    programMembershipRegistered,
                    theaterBranchCode,
                    pointAwardAccount,
                    creditCard
                });
            }

            // 会員登録確認
            isRegister = await this.member.isRegister({ interval: 3000, limit: 20 });
            if (!isRegister) {
                this.router.navigate(['/error', { redirect: '/auth/select' }]);

                return;
            }

            this.router.navigate(['/']);
        } catch (err) {
            console.error(err);
            // 会員プログラム登録失敗
            this.isLoading = false;
            this.utilService.openAlert({
                title: 'エラーが発生しました',
                body: `再度ご登録してください。`
            });
        }
    }



}
