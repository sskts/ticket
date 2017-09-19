/**
 * AuthLoginComponentテスト
 */
import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoadingComponent } from '../../components/loading/loading.component';
import { AuthLoginComponent } from './auth-login.component';

// tslint:disable-next-line:no-stateless-class component-selector
@Injectable()
export class SasakiService {
    public credentials: any;
    public auth: any;
    public events: any;
    public people: any;
    public place: any;

    constructor() {
    }
}

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthLoginComponent,
        LoadingComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
