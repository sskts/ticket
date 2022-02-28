import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmartTheaterService, UserService } from '../../../../../services';

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
    public isLoading: boolean;
    public theaterName: string;
    public creditCard?: {
        cardNo: string;
        expire: string;
    };

    constructor(
        public userService: UserService,
        private router: Router,
        private smartTheaterService: SmartTheaterService
    ) {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            this.isLoading = true;
            this.creditCard = this.userService.getCreditCard(0);
            await this.smartTheaterService.getServices();
            const seller = await this.smartTheaterService.seller.search({});
            this.theaterName = '';
            if (
                this.userService.data.profile === undefined ||
                this.userService.data.profile.additionalProperty === undefined
            ) {
                this.isLoading = false;
                return;
            }
            const additionalProperty =
                this.userService.data.profile.additionalProperty.find(
                    (a) => a.name === 'custom:theaterCode'
                );
            if (additionalProperty === undefined) {
                this.isLoading = false;
                return;
            }
            const theaterCode = additionalProperty.value;
            const findResult = seller.find((s) => s.branchCode === theaterCode);
            if (findResult === undefined) {
                this.isLoading = false;
                return;
            }
            this.theaterName = findResult.name.ja;
        } catch (error) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.error('PurchaseComponent.ngOnInit', error);
        }
        this.isLoading = false;
    }
}
