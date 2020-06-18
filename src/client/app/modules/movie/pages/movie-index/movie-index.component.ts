/**
 * TicketComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services';


@Component({
    selector: 'app-movie',
    templateUrl: './movie-index.component.html',
    styleUrls: ['./movie-index.component.scss']
})
/**
 * 作品情報
 * @class MovieIndexComponent
 * @implements OnInit
 */
export class MovieIndexComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        private router: Router,
        public user: UserService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        console.log(this.router.url);
        this.isLoading = true;
        this.isLoading = false;
    }

}
