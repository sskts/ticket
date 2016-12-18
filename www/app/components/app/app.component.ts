import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app/components/app/app.component.html',
    styleUrls: ['app/components/app/app.component.scss']
})
export class AppComponent {

    constructor(private router: Router) {
        
    }

    ngOninit() {
    }
}
