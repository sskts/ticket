/**
 * AppComponentテスト
 */
import { async, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { AppComponent } from './app.component';

// tslint:disable-next-line:no-stateless-class component-selector
@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletStubComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
