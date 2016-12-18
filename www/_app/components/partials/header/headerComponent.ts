import { Component, Input } from '@angular/core';

@Component({
    selector: 'header',
    template: `
        <div class="header">
            <div class="logo"><img src="images/logo.jpg"></div>
            <div class="header-ttl">{{pageName}}</div>
        </div>
    `
})

export class headerComponent {
    @Input() pageName: string;
}
