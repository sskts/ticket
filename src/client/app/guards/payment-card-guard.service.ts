import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root',
})
export class PaymentCardGuardService implements CanActivate {
    constructor(private userService: UserService) {}

    /**
     * 認証
     * @method canActivate
     */
    public async canActivate() {
        if (!this.userService.isMember()) {
            // 非会員
            return true;
        }
        if (
            this.userService.data.userName !== undefined &&
            this.userService.data.userName !== ''
        ) {
            // ユーザーネーム保存
            this.userService.data.prevUserName = this.userService.data.userName;
        }
        this.userService.save();
        const accounts =
            this.userService.data.accounts.length === 0
                ? await this.userService.searchPointAccount()
                : this.userService.data.accounts;
        if (accounts.length === 0) {
            await this.userService.openPointAccount();
            return false;
        }

        return true;
    }
}
