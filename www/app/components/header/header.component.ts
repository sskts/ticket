import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: 'app/components/header/header.component.html',
    styleUrls: ['app/components/header/header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pageName: string;

    constructor(private router:Router) { }

    ngOnInit() {
        this.router.events.subscribe((value)=> {
            if (value.url === (
                '/index' 
            )) {
                this.pageName = 'TOP';
            } else if (value.url === (
                '/myPage' 
            )) {
                this.pageName = 'マイページ';
            } else if (value.url === (
                '/performance' 
            )) {
                this.pageName = 'チケット購入';
            }
        });
    }

}
