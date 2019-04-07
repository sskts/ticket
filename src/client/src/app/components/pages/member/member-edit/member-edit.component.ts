import { Component, OnInit } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import { SasakiService } from '../../../../services/sasaki/sasaki.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
    public theaterName: string;

    constructor(
        public user: UserService,
        private sasaki: SasakiService
    ) {
        this.theaterName = '';
    }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.theaterName = await this.getTheaterName();
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
}
