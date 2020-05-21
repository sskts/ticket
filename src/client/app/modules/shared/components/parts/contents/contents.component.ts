import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-contents',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit, OnDestroy {
    @Input() public touch?: boolean;
    public isFocus: boolean;
    public onDOMFocusIn: any;
    public onDOMFocusOut: any;

    constructor(
        private router: Router,
        private elementRef: ElementRef,
    ) { }

    public async ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const element: HTMLElement = this.elementRef.nativeElement.querySelector('.scroll');
                setTimeout(() => {
                    element.scrollTop = 0;
                }, 0);
            }
        });
        if (this.touch === undefined) {
            this.touch = true;
        }
        this.isFocus = false;
        this.onDOMFocusIn = (event: Event) => {
            if (event.target === null) {
                return;
            }
            const element = <any>event.target;
            const tagName = element.tagName;
            const type = element.type;
            if (tagName === undefined || tagName !== 'INPUT') {
                return;
            }
            if (type === undefined) {
                return;
            }
            if (type === 'text'
                || type === 'number'
                || type === 'password'
                || type === 'email'
                || type === 'tel') {
                this.isFocus = true;
            }
        };
        this.onDOMFocusOut = (_event: Event) => {
            this.isFocus = false;
        };
        document.addEventListener('DOMFocusIn', this.onDOMFocusIn, false);
        document.addEventListener('DOMFocusOut', this.onDOMFocusOut, false);
    }

    public ngOnDestroy() {
        document.removeEventListener('DOMFocusIn', this.onDOMFocusIn, false);
        document.removeEventListener('DOMFocusOut', this.onDOMFocusOut, false);
    }

}
