import { Component, OnInit } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import { AwsCognitoService } from '../../../../services/aws-cognito/aws-cognito.service';
import { SasakiService } from '../../../../services/sasaki/sasaki.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
    public theaterName: string;
    public verifyCodeModal: boolean;
    public emailVerified: boolean;
    public verifyCode: string;
    public isOnetimePassSended: boolean;
    public isLoading: boolean;
    public error: {code: string, message: string} | null;

    constructor(
        public user: UserService,
        private sasaki: SasakiService,
        private awsCognitoService: AwsCognitoService,
    ) {
        this.theaterName = '';
    }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.checkEmailVerified();
        this.theaterName = await this.getTheaterName();
        this.isLoading = false;
        this.error = null;
    }

    /**
      * 劇場一覧取得
      */
    private async getTheaterName() {
        const code = this.user.getWellGoTheaterCode();
        if (code !== undefined) {
            await this.sasaki.getServices();
            const result = await this.sasaki.seller.search({
                typeOfs: [factory.organizationType.MovieTheater],
                location: { branchCodes: [code] }
            });
            if (result.data.length > 0) {
                return result.data[0].name.ja;
            }
        }
        return this.user.getTheaterName(0);
    }

    /**
     * ワンタイムパスワード
     */
    public async confirmVerificationCode() {
        if (this.sasaki.auth.credentials.accessToken !== undefined) {
            try{
                this.isLoading =  true;
                await this.awsCognitoService.verifyEmailAddress(this.sasaki.auth.credentials.accessToken, this.verifyCode);
                await this.user.resetProfile();
                this.checkEmailVerified();
                this.isLoading =  false;
            } catch(err) {
                console.log(err);
                this.isLoading =  false;
                this.error = {
                    code: err.code,
                    message: err.message,
                }
            }
        }
    }

    /**
     * メールアドレスが認証済みか確認する
     */
    private checkEmailVerified() {
        this.verifyCodeModal = false;
        this.emailVerified = true;
        this.isOnetimePassSended = true;
        if(this.user.data.profile !== undefined && this.user.data.profile.additionalProperty !== undefined) {
            if(this.user.data.profile.additionalProperty.find((prop) =>{
                return prop.name === "email_verified" && prop.value === "false";
            }) !== undefined) {
                this.verifyCodeModal = true;
                this.emailVerified = false;
                this.isOnetimePassSended = false;
            }
        }
    }

    public async clickResendVerifyCode() {
        if (this.sasaki.auth.credentials.accessToken !== undefined) {
            this.isLoading = true;
            try {
                await this.awsCognitoService.resendVerifyEmailCode(this.sasaki.auth.credentials.accessToken);
                this.isOnetimePassSended = true;
                this.isLoading = false;
            } catch (err) {
                console.log(err);
                this.isLoading = false;
                this.error = {
                    code: err.code,
                    message: err.message,
                }
            }
        }
    }
}
