import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { CinerinoService, MasterService, MemberService } from '../../../../../services';

@Component({
    selector: 'app-auth-register-program-membership',
    templateUrl: './auth-register-program-membership.component.html',
    styleUrls: ['./auth-register-program-membership.component.scss']
})
export class AuthRegisterProgramMembershipComponent implements OnInit {
    public programMemberships: factory.programMembership.IProgramMembership[];
    public isLoading: boolean;
    public alertModal: boolean;
    public optionsForm: FormGroup;
    public theaters: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>[];

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private cinerino: CinerinoService,
        private member: MemberService,
        private masterService: MasterService,
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.alertModal = false;
        this.isLoading = true;
        this.optionsForm = this.createForm();
        try {
            this.theaters = await this.masterService.searchSeller(
                { typeOfs: [factory.organizationType.MovieTheater] },
                {exclude: true, sort: true}
            );

            // 会員プログラム取得
            this.programMemberships = await this.member.getProgramMemberships();

            if (this.programMemberships.length === 0) {
                throw new Error('programMemberships is not found');
            }
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
            const accounts = await this.searchPointAccount();
            if (accounts.length > 1) {
                // ポイントアカウントが複数存在する場合、最初の一件を残してクローズする
                for (let i = 1; i < accounts.length; i++) {
                    await this.cinerino.ownerShipInfo.closeAccount({
                        id: 'me',
                        accountType: factory.accountType.Point,
                        accountNumber: accounts[i].typeOfGood.accountNumber
                    });
                }
            }
            // 販売劇場検索
            const theaterCode = this.optionsForm.controls.theater.value;
            const programMembership = this.programMemberships[0];
            // 会員登録
            await this.member.register({
                theaterCode: theaterCode,
                programMembership: programMembership
            });

            // 会員登録確認
            const isRegister = await this.member.isRegister();
            if (!isRegister) {
                this.router.navigate(['/error', { redirect: '/auth/select' }]);

                return;
            }

            this.router.navigate(['/']);
        } catch (err) {
            console.error(err);
            // 会員プログラム登録失敗
            this.isLoading = false;
            this.alertModal = true;
        }
    }

    /**
     * ポイントアカウントを検索する
     * @method searchPointAccount
     */
    private async searchPointAccount() {
        // 口座検索
        const accountSearchResult = await this.cinerino.ownerShipInfo.search({
            id: 'me',
            typeOfGood: {
                typeOf: factory.ownershipInfo.AccountGoodType.Account,
                accountType: factory.accountType.Point
            }
        });
        const accounts = accountSearchResult.data.filter((account) => {
            return (account.typeOfGood.typeOf === factory.pecorino.account.TypeOf.Account
                && account.typeOfGood.accountType === factory.accountType.Point
                && account.typeOfGood.status === factory.pecorino.accountStatusType.Opened);
        });
        return <factory.ownershipInfo.IOwnershipInfo<factory.pecorino.account.IAccount<factory.accountType.Point>>[]>accounts;
    }



}
