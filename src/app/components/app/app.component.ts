/**
 * AppComponent
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor() {
    console.log('AppComponent constructor');
  }

  public ngOnInit() {
    console.log('AppComponent ngOnInit');
  }
}

