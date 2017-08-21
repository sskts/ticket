
/**
 * ヘッダーコンポーネント
 */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(private router: Router) { }

  public ngOnInit() {
    this.isOpen = false;
    this.changeTitle(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeTitle(event.url);
      }
    });
  }

  public open() {
    this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }

  private changeTitle(url: string) {
    const page = pages.find((value) => {
      return (value.url === url);
    });
    this.title = page.title;
  }

}

/**
 * ページ情報
 * @const pages
 */
const pages = [
  { url: '/main/ticket-holder', title: 'チケットホルダー' },
  { url: '/main/purchase', title: 'チケット購入' },
  { url: '/main/setting', title: '設定変更' }
];
