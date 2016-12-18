import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-navi',
    templateUrl: './navi.component.html',
    styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {
    public activeNo: string;

    constructor(private router:Router) { }

    ngOnInit() {
        this.router.events.subscribe((value)=> {
            if (value.url === (
                '/index' 
            )) {
                this.activeNo = '0';
            } else if (value.url === (
                '/myPage' 
            )) {
                this.activeNo = '1';
            } else if (value.url === (
                '/performance' 
            )) {
                this.activeNo = '2';
            }
        });
    }

}
