import { Component, Inject, forwardRef } from '@angular/core';
import { AppComponent } from '../../components/app/AppComponent';

@Component({
    selector: 'index',
    template: `
        index
    `
})
export class IndexComponent {

    constructor(@Inject(forwardRef(() => AppComponent)) private app : AppComponent) {
        
    }
   

    
}

