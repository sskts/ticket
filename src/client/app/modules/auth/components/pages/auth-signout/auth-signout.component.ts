import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    AwsCognitoService,
    MemberType,
    SmartTheaterService,
    UserService,
} from '../../../../../services';

@Component({
    selector: 'app-auth-signout',
    templateUrl: './auth-signout.component.html',
    styleUrls: ['./auth-signout.component.scss'],
})
export class AuthSignoutComponent implements OnInit {
    constructor(
        private router: Router,
        private userService: UserService,
        private awsCognitoService: AwsCognitoService,
        private smartTheaterService: SmartTheaterService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            await this.smartTheaterService.signOut();
        } catch {
            try {
                await this.awsCognitoService.signOut();
            } catch {
                this.userService.data.memberType = MemberType.NotMember;
                this.userService.reset();
                this.router.navigate(['/auth/select'], { replaceUrl: true });
            }
        }
    }
}
