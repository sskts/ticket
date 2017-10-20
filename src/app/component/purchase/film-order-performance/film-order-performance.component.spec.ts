/**
 * FilmOrderPerformanceComponent
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmOrderPerformanceComponent } from './film-order-performance.component';

describe('FilmOrderPerformanceComponent', () => {
    let component: FilmOrderPerformanceComponent;
    let fixture: ComponentFixture<FilmOrderPerformanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FilmOrderPerformanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilmOrderPerformanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
