/**
 * HeaderComponent
 */
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
/**
 * ヘッダー
 * @class HeaderComponent
 * @implements OnInit
 */
export class HeaderComponent implements OnInit {

    public page: {
        url: string;
        title: string;
        prev: boolean;
    };
    public isMenuOpen: boolean;
    public isLogoutModalOpen: boolean;

    constructor(
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.isMenuOpen = false;
        this.isLogoutModalOpen = false;
        this.changePage(this.router.url);
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.changePage(event.url);
            }
        });
    }

    public menuOpen(): void {
        this.isMenuOpen = true;
    }

    public menuClose(): void {
        this.isMenuOpen = false;
    }

    public logoutModalOpen(): void {
        this.menuClose();
        this.isLogoutModalOpen = true;
    }

    public logoutModalClose(): void {
        this.isLogoutModalOpen = false;
    }

    private changePage(url: string): void {
        const page = pages.find((value) => {
            return (value.url === url);
        });
        if (page === undefined) {
            this.page = { url: '', title: 'NOT FOUND', prev: false };

            return;
        }
        this.page = page;
    }
}

/**
 * ページ情報
 * @const pages
 */
const pages = [
    { url: '/ticket-holder', title: 'チケットホルダー', prev: false },
    { url: '/purchase', title: 'チケット購入', prev: false },
    { url: '/setting', title: '設定変更', prev: false },
    { url: '/about', title: 'このアプリについて', prev: true },
    { url: '/profile', title: 'ユーザー情報変更', prev: true },
    { url: '/policy', title: '利用規約', prev: true },
    { url: '/law', title: '特定商取引法に基づく表記', prev: true },
    { url: '/privacy', title: 'プライバシーポリシー', prev: true }
];
