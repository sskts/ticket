import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth-register',
    templateUrl: './auth-register.component.html',
    styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        window.scrollTo(0, 0);
    }

}
