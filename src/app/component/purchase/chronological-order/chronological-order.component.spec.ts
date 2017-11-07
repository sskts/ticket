/**
 * ChronologicalOrderComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologicalOrderComponent } from './chronological-order.component';

describe('ChronologicalOrderComponent', () => {
    let component: ChronologicalOrderComponent;
    let fixture: ComponentFixture<ChronologicalOrderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChronologicalOrderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChronologicalOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });
});
