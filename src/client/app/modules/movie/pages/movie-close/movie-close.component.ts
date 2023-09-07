/**
 * MovieComponent
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-movie-close',
    templateUrl: './movie-close.component.html',
    styleUrls: ['./movie-close.component.scss'],
})
/**
 * @class MovieCloseComponent
 * @implements OnInit
 */
export class MovieCloseComponent implements OnInit {
    public isLoading: boolean;

    constructor() {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = false;
    }
}
