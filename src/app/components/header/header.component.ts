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

  constructor(
    private router: Router
  ) { }

  public ngOnInit(): void {
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

}

/**
 * ページ情報
 * @const pages
 */
const pages = [
  { url: '/ticket-holder', title: 'チケットホルダー' },
  { url: '/purchase', title: 'チケット購入' },
  { url: '/setting', title: '設定変更' }
];
