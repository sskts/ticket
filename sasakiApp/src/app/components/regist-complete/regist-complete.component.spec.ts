/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegistCompleteComponent } from './regist-complete.component';

describe('RegistCompleteComponent', () => {
    let component: RegistCompleteComponent;
    let fixture: ComponentFixture<RegistCompleteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistCompleteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistCompleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
