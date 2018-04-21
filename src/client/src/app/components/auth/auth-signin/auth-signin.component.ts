import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SasakiService } from '../../../services/sasaki/sasaki.service';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-auth-signin',
    templateUrl: './auth-signin.component.html',
    styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

    constructor(
        private router: Router,
        private user: UserService,
        private sasaki: SasakiService,
        private activatedRoute: ActivatedRoute
    ) { }

    public async ngOnInit() {
        this.activatedRoute.queryParams.subscribe(async (queryParams) => {
            const signInRedirectedArgs = {
                authorizeCode: queryParams.authorizeCode,
                state: queryParams.state
            };
            try {
                await this.sasaki.signInRedirected(signInRedirectedArgs);
                await this.user.initMember();
                this.router.navigate(['/']);
            } catch (err) {
                console.error(err);
                this.router.navigate(['/error', { redirect: '/auth/select' }]);
            }
        });
    }

}
