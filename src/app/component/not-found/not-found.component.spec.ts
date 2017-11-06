// /**
//  * NotFoundComponentテスト
//  */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { Router, RouterStub } from '../../testing/router-stubs';
// import { NotFoundComponent } from './not-found.component';

// describe('NotFoundComponent', () => {
//     it('コンポーネント生成', async () => {
//         const routerStub = new RouterStub();
//         spyOn(routerStub, 'navigate');
//         await TestBed.configureTestingModule({
//             declarations: [
//                 NotFoundComponent
//             ],
//             providers: [
//                 { provide: Router, useValue: routerStub }
//             ]
//         })
//             .compileComponents();
//         const fixture = TestBed.createComponent(NotFoundComponent);
//         const component = fixture.componentInstance;
//         fixture.detectChanges();

//         await expect(component).toBeTruthy();
//         await expect(routerStub.navigate).toHaveBeenCalled();
//     });
// });
