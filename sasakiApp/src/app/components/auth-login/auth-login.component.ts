import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
    selector: 'app-auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

    public formGroup: FormGroup;
    public mail: AbstractControl;
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
     * ログイン
     */
    public onSubmit(value: string): void {
        this.submitFlag = true;
        if (this.formGroup.valid) {
            this.router.navigate(['']);
        }
    }

    /**
     * バリデーション
     */
    private getFormControls(): any {
        let result = {
            mail: ['', Validators.compose([
                Validators.required,
                Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
            ])],
            password: ['', Validators.compose([
                Validators.required
            ])]
        };

        return result;
    }

    /**
     * フォームセッティング
     */
    private settingForms(): void {
        this.mail = this.formGroup.controls['mail'];
        this.password = this.formGroup.controls['password'];
    }

}
