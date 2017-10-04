/**
 * NotFoundComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
/**
 * NotFound
 * @class NotFoundComponent
 * @implements OnInit
 */
export class NotFoundComponent implements OnInit {

    constructor(private router: Router) { }

    public async ngOnInit() {
        this.router.navigate(['']);
    }

}
