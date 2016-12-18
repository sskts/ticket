/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegistInputComponent } from './regist-input.component';

describe('RegistInputComponent', () => {
    let component: RegistInputComponent;
    let fixture: ComponentFixture<RegistInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistInputComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
