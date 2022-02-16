import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services';

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
    public theaterName: string;

    constructor(public user: UserService) {
        this.theaterName = '';
    }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {}
}
