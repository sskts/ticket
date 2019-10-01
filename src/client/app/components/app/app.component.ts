/**
 * AppComponent
 */
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SaveType, StorageService } from '../../services';

declare const ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private router: Router, private storage: StorageService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // Googleアナリティクス pageview
                try {
                    ga('create', environment.ANALYTICS_ID, 'auto');
                    ga('set', 'page', event.urlAfterRedirects);
                    ga('send', 'pageview');
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        const STORAGE_KEY = 'information';
        this.storage.save(STORAGE_KEY, { show: true }, SaveType.Session);
    }
}
