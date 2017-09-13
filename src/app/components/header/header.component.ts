/**
 * HeaderComponent
 */
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { SasakiService } from '../../service/sasaki/sasaki.service';
import { UserService } from '../../service/user/user.service';

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
  /**
   * タイトル
   * @memberof HeaderComponent
   */
  public title: string;
  /**
   * メニュー状態
   * @memberof isOpen
   */
  public isOpen: boolean;
  /**
   * 名前
   * @memberof HeaderComponent
   */
  public name: string;
  /**
   * ポータルサイト
   * @memberof HeaderComponent
   */
  public portalSite: string;

  constructor(
    private router: Router,
    private user: UserService,
    private sasaki: SasakiService
  ) { }

  public ngOnInit(): void {
    this.name = `${this.user.contacts.familyName} ${this.user.contacts.givenName}`;
    this.portalSite = environment.portalSite;
    this.isOpen = false;
    this.changeTitle(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeTitle(event.url);
      }
    });
  }

  public open(): void {
    this.isOpen = true;
  }

  public close(): void {
    this.isOpen = false;
  }

  private changeTitle(url: string): void {
    const page = pages.find((value) => {
      return (value.url === url);
    });
    if (page === undefined) {
      return;
    }
    this.title = page.title;
  }

  public async logout() {
    try {
      await this.sasaki.auth.signOut();
      console.log('logout');
      this.sasaki.credentials = null;
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error(error);
    }
  }

}

/**
 * ページ情報
 * @const pages
 */
const pages = [
  { url: '/ticket-holder', title: 'チケットホルダー' },
  { url: '/purchase', title: 'チケット購入' },
  { url: '/setting', title: '設定変更' },
  { url: '/about', title: 'このアプリについて' }
];
