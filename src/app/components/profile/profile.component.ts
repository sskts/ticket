/**
 * ProfileComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SasakiService } from '../../service/sasaki/sasaki.service';
import { UserService } from '../../service/user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public isLoading: boolean;
    public updateForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private user: UserService,
        private sasaki: SasakiService
    ) {
        console.log('LoginComponent constructor');
    }

    public ngOnInit() {
        this.isLoading = false;
        this.updateForm = this.formBuilder.group({
            mail: new FormControl(this.user.contacts.email, [
                Validators.required,
                Validators.maxLength(30),
                Validators.email
            ]),
            givenName: new FormControl(this.user.contacts.givenName, [
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(/^[ぁ-ゞー]+$/)
            ]),
            familyName: new FormControl(this.user.contacts.familyName, [
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(/^[ぁ-ゞー]+$/)
            ]),
            telephone: new FormControl(this.user.contacts.telephone.replace(/\-/g, ''), [
                Validators.required,
                Validators.maxLength(15),
                Validators.pattern(/^[0-9]+$/)
            ])
        });
    }

    public async submit() {
        this.isLoading = true;
        try {
            await this.sasaki.people.updateContacts({
                personId: 'me',
                contacts: {
                    email: this.updateForm.controls.mail.value,
                    familyName: this.updateForm.controls.familyName.value,
                    givenName: this.updateForm.controls.givenName.value,
                    telephone: this.updateForm.controls.telephone.value
                }
            });
        } catch (err) {
            console.error('updateContacts 失敗', err);
        }
        this.isLoading = false;
    }

}
