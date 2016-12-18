import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-regist-input',
    templateUrl: './regist-input.component.html',
    styleUrls: ['./regist-input.component.scss']
})
export class RegistInputComponent implements OnInit {

    public formGroup: FormGroup;
    public lastName: AbstractControl;
    public firstName: AbstractControl;
    public mail: AbstractControl;
    public tel: AbstractControl;
    public password: AbstractControl;
    public credit: AbstractControl;
    public creditNo: AbstractControl;
    public holderName: AbstractControl;
    public expireYear: AbstractControl;
    public expireMonth: AbstractControl;
    public securityCode: AbstractControl;
    public submitFlag: boolean;

    public years: string[];
    public months: string[];

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.formGroup = formBuilder.group(this.getFormControls());
    }

    ngOnInit() {
        this.submitFlag = false;
        this.settingForms();
        this.years = this.getYears();
        this.months = this.getMonths();
    }

    /**
     * 確認
     */
    public onSubmit(value: string): void {
        this.submitFlag = true;

        //動的なバリデーションがあるものは更新
        this.creditNo.updateValueAndValidity();
        this.holderName.updateValueAndValidity();
        this.securityCode.updateValueAndValidity();
        //バリデーションチェック
        if (this.formGroup.valid) {
            let user = {
                lastName: this.lastName.value,
                firstName: this.firstName.value,
                mail: this.mail.value,
                tel: this.tel.value,
                password: this.password.value,
                credit: this.credit.value,
                creditNo: this.creditNo.value,
                holderName: this.holderName.value,
                expireYear: this.expireYear.value,
                expireMonth: this.expireMonth.value,
                securityCode: this.securityCode.value,
            };
            
            sessionStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['regist/confirm']);
        }
    }

    /**
     * バリデーション
     */
    private getFormControls(): any {
        let user: any = JSON.parse(sessionStorage.getItem('user'));
        let defaultValues = {
            lastName: (user) ? user.lastName : '',
            firstName: (user) ? user.firstName : '',
            mail: (user) ? user.mail : '',
            tel: (user) ? user.tel : '',
            password: (user) ? user.password : ''
        };

        let result = {
            lastName: [defaultValues.lastName, Validators.compose([
                Validators.required,
                Validators.pattern(/^[ァ-ン]+$/)
            ])],
            firstName: [defaultValues.firstName, Validators.compose([
                Validators.required,
                Validators.pattern(/^[ァ-ン]+$/)
            ])],
            mail: [defaultValues.mail, Validators.compose([
                Validators.required,
                Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
            ])],
            tel: [defaultValues.tel, Validators.compose([
                Validators.required,
                Validators.pattern(/^[0-9]+$/)
            ])],
            password: [defaultValues.password, Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8)
            ])],
            credit: ['', Validators.compose([])],
            creditNo: ['', Validators.compose([
                (control: AbstractControl) => {
                    if (this.credit && this.credit.value && control.value === '') {
                        return {creditRequired: true};
                    }
                    return null;
                },
                Validators.maxLength(16),
                Validators.pattern(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[0-9]{15})$/)
            ])],
            holderName: ['', Validators.compose([
                (control: AbstractControl) => {
                    if (this.credit && this.credit.value && control.value === '') {
                        return {creditRequired: true};
                    }
                    return null;
                },
                Validators.pattern(/^[A-Z]+[\s|　]+[A-Z]+[\s|　]*[A-Z]+$/)
            ])],
            expireYear: ['', Validators.compose([
            ])],
            expireMonth: ['', Validators.compose([
            ])],
            securityCode: ['', Validators.compose([
                (control: AbstractControl) => {
                    if (this.credit && this.credit.value && control.value === '') {
                        return {creditRequired: true};
                    }
                    return null;
                },
                Validators.pattern(/^[0-9]{3,4}$/)
            ])]
        };

        return result;
    }

    /**
     * フォームセッティング
     */
    private settingForms(): void {
        this.lastName = this.formGroup.controls['lastName'];
        this.firstName = this.formGroup.controls['firstName'];
        this.mail = this.formGroup.controls['mail'];
        this.tel = this.formGroup.controls['tel'];
        this.password = this.formGroup.controls['password'];
        this.credit = this.formGroup.controls['credit'];
        this.creditNo = this.formGroup.controls['creditNo'];
        this.holderName = this.formGroup.controls['holderName'];
        this.expireYear = this.formGroup.controls['expireYear'];
        this.expireMonth = this.formGroup.controls['expireMonth'];
        this.securityCode = this.formGroup.controls['securityCode'];
    }

    /**
     * 年取得
     */
    private getYears(): string[] {
        let result: string[] = [];
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        for (let i = 0; i < 10; i++) {
            result.push(String(year + i));
        } 
        return result;
    }

    /**
     * 月取得
     */
    private getMonths(): string[] {
        let result: string[] = [];
        for (let i = 0; i < 12; i++) {
            result.push(String(i + 1));
        } 
        return result;
    }

}
