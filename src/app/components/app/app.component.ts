/**
 * ルートコンポーネント
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private sasakiService: SasakiService
  ) {
    console.log('AppComponent constructor');
  }

  public ngOnInit() {
    console.log('AppComponent ngOnInit');
  }
}

