/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegistConfirmComponent } from './regist-confirm.component';

describe('RegistConfirmComponent', () => {
    let component: RegistConfirmComponent;
    let fixture: ComponentFixture<RegistConfirmComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistConfirmComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
