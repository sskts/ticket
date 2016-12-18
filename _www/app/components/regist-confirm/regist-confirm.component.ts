import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';



@Component({
    selector: 'app-regist-confirm',
    templateUrl: 'app/components/regist-confirm/regist-confirm.component.html',
    styleUrls: ['app/components/regist-confirm/regist-confirm.component.scss']
})
export class RegistConfirmComponent implements OnInit {

    public formGroup: FormGroup;
    public user: any;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.formGroup = formBuilder.group({});
        this.user = JSON.parse(sessionStorage.getItem('user'));
    }

    ngOnInit() {
    }

    /**
     * ワンタイムパスワード発行
     */
    public onSubmit(value: string): void {
        this.router.navigate(['regist/password']);
    }

}
