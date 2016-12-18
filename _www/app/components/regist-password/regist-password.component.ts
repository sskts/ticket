import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
    selector: 'app-regist-password',
    templateUrl: 'app/components/regist-password/regist-password.component.html',
    styleUrls: ['app/components/regist-password/regist-password.component.scss']
})
export class RegistPasswordComponent implements OnInit {

    public formGroup: FormGroup;
    public password: AbstractControl;
    public submitFlag: boolean;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.formGroup = formBuilder.group(this.getFormControls());
        
    }

    ngOnInit() {
        this.submitFlag = false;
        this.settingForms();
    }

    /**
     * 会員登録をする
     */
    public onSubmit(value: string): void {
        this.submitFlag = true;
        console.log(this)
        //バリデーションチェック
        if (this.formGroup.valid) {
            let password = this.password.value;
            
            localStorage.setItem('user', sessionStorage.getItem('user'));
            this.router.navigate(['regist/complete']);
        }
    }

    /**
     * バリデーション
     */
    private getFormControls(): any {
        let result = {
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8)
            ])]
        };

        return result;
    }

    /**
     * フォームセッティング
     */
    private settingForms(): void {
        this.password = this.formGroup.controls['password'];
    }

}
