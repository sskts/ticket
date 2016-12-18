/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegistPasswordComponent } from './regist-password.component';

describe('RegistPasswordComponent', () => {
    let component: RegistPasswordComponent;
    let fixture: ComponentFixture<RegistPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistPasswordComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
