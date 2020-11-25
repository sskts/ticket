import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import * as libphonenumber from 'libphonenumber-js';
import { environment } from '../../../../../../environments/environment';
import { MasterService, UserService } from '../../../../../services';

type IMovieTheater = factory.chevre.seller.ISeller;

@Component({
    selector: 'app-member-edit-profile',
    templateUrl: './member-edit-profile.component.html',
    styleUrls: ['./member-edit-profile.component.scss']
})
export class MemberEditProfileComponent implements OnInit {
    public profileForm: FormGroup;
    public isLoading: boolean;
    public theaters: IMovieTheater[];
    public staticProfile: {
        email: string
    };
    constructor(
        private formBuilder: FormBuilder,
        private elementRef: ElementRef,
        private router: Router,
        private user: UserService,
        private masterService: MasterService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        try {
            this.profileForm = this.createForm();
            this.isLoading = false;
            this.theaters = await this.masterService.searchSeller(
                {},
                { exclude: true, sort: true }
            );
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/member/edit/profile' }]);
        }
    }

    /**
     * フォーム作成
     * @method createForm
     */
    private createForm() {
        const NAME_MAX_LENGTH = 12;
        const TEL_MAX_LENGTH = 11;
        const TEL_MIN_LENGTH = 9;

        const profile = {
            familyName: {
                value: '',
                validators: [
                    Validators.required,
                    Validators.maxLength(NAME_MAX_LENGTH),
                    Validators.pattern(/^[ァ-ヶー]+$/)
                ]
            },
            givenName: {
                value: '',
                validators: [
                    Validators.required,
                    Validators.maxLength(NAME_MAX_LENGTH),
                    Validators.pattern(/^[ァ-ヶー]+$/)
                ]
            },
            telephone: {
                value: '', validators: [
                    Validators.required,
                    Validators.maxLength(TEL_MAX_LENGTH),
                    Validators.minLength(TEL_MIN_LENGTH),
                    Validators.pattern(/^[0-9]+$/),
                    (control: AbstractControl): ValidationErrors | null => {
                        const field = control.root.get('telephone');
                        if (field !== null) {
                            const parsedNumber = libphonenumber.parse(field.value, 'JP');
                            if (parsedNumber.phone === undefined) {
                                return { telephone: true };
                            }
                            const isValid = libphonenumber.isValidNumber(parsedNumber);
                            if (!isValid) {
                                return { telephone: true };
                            }
                        }

                        return null;
                    }
                ]
            },
            theaterCode: {
                value: '',
                validators: [Validators.required]
            }
        };

        const contact = this.user.data.profile;
        if (contact === undefined) {
            throw new Error('contact is undefined');
        }
        profile.givenName.value = contact.givenName === undefined ? '' : contact.givenName;
        profile.familyName.value = contact.familyName === undefined ? '' : contact.familyName;
        profile.telephone.value = this.user.getTelephone();
        this.staticProfile = {
            email: contact.email === undefined ? '' : contact.email
        };
        const theaterCode = this.user.getWellGoTheaterCode();
        profile.theaterCode.value =
            (theaterCode === undefined || environment.CLOSE_THEATERS.find(t => t === theaterCode) !== undefined)
                ? '' : theaterCode;

        return this.formBuilder.group({
            familyName: [profile.familyName.value, profile.familyName.validators],
            givenName: [profile.givenName.value, profile.givenName.validators],
            telephone: [profile.telephone.value, profile.telephone.validators],
            theaterCode: [profile.theaterCode.value, profile.theaterCode.validators],
        });
    }

    /**
     * フォーム確定
     * @method onSubmit
     */
    public async onSubmit() {
        this.isLoading = true;
        Object.keys(this.profileForm.controls).forEach((key) => {
            this.profileForm.controls[key].markAsTouched();
            this.profileForm.controls[key].setValue((<HTMLInputElement>document.getElementById(key)).value);
        });
        if (this.profileForm.invalid) {
            // フォームのステータス変更
            setTimeout(() => {
                const element: HTMLElement = this.elementRef.nativeElement;
                const validation = <HTMLElement>element.querySelector('.validation');
                if (validation === null) {
                    return;
                }
                const rect = validation.getBoundingClientRect();
                const contents = (<HTMLElement>element.querySelector('app-page .scroll'));
                const scrollTop = contents.scrollTop;
                const top = rect.top + scrollTop - 80;
                contents.scrollTo(0, top);
            }, 0);
            this.isLoading = false;
            return;
        }

        try {
            await this.user.updateProfile({
                familyName: this.profileForm.controls.familyName.value,
                givenName: this.profileForm.controls.givenName.value,
                email: this.staticProfile.email,
                telephone: this.profileForm.controls.telephone.value,
                theaterCode: this.profileForm.controls.theaterCode.value,
            });
            this.router.navigate(['/member/edit']);
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/member/edit/profile' }]);
        }
    }

}
