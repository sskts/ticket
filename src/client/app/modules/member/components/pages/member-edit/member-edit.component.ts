import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { CinerinoService, UserService } from '../../../../../services';

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
    public theaterName: string;

    constructor(
        public user: UserService,
        private cinerino: CinerinoService
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
            await this.cinerino.getServices();
            const result = await this.cinerino.seller.search({
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
