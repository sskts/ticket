/**
 * RouterStub
 */
import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class RouterStub {
    public url: string;
    constructor() {
        this.url = '';
    }
    public navigate(commands: any[], extras?: NavigationExtras) {
        console.log('navigate', commands, extras);
     }
}
