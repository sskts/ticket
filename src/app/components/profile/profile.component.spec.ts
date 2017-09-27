/**
 * ProfileComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SasakiService, SasakiStubService } from '../../service/sasaki/sasaki-stub.service';
import { UserService, UserStubService } from '../../service/user/user-stub.service';
import { LoadingComponent } from '../loading/loading.component';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfileComponent,
                LoadingComponent
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: SasakiService, useClass: SasakiStubService },
                { provide: UserService, useClass: UserStubService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });
});
