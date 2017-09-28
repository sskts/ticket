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

    it('コンポーネント生成', async () => {
        await TestBed.configureTestingModule({
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
        const fixture = TestBed.createComponent(ProfileComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('submit 正常', async () => {
        await TestBed.configureTestingModule({
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
        const fixture = TestBed.createComponent(ProfileComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        await component.submit();
        await expect(component.isLoading).toBeFalsy();
    });

    it('submit エラー', async () => {
        const sasakiStubService = new SasakiStubService();
        spyOn(sasakiStubService.people, 'updateContacts').and.returnValue(Promise.reject({}));
        await TestBed.configureTestingModule({
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
        const fixture = TestBed.createComponent(ProfileComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        await component.submit();
        await expect(component.isLoading).toBeFalsy();
    });
});
