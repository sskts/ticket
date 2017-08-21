/**
 * ルートコンポーネント
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
    console.log('AppComponent constructor');
  }

  public ngOnInit() {
    console.log('AppComponent ngOnInit');
    this.router.navigate(['/auth/login']);
    // this.router.navigate(['/main/ticket-holder']);
  }
}

