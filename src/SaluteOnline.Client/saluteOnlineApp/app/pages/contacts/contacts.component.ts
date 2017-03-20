import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { UrlsService } from "../../services/urls";
import { EmailValidator } from "../../services/validators/email.validator";
import { AuthHttp } from 'angular2-jwt';
import { HttpHelpers } from "../../services/http.helpers";
import { StringsKeyValue } from "../../domain/DataStructures";
import { MdSnackBar } from "@angular/material";

@Component({
    selector: 'so-contacts',
    providers: [UrlsService],
    encapsulation: ViewEncapsulation.None,
    styles: [require('./contacts.component.scss').toString()],
    template: require('./contacts.component.html')
})

export class SoContacts {
    feedbackForm: FormGroup;
    spinnerVisibility: boolean;

    constructor(private _fb: FormBuilder, private _urls: UrlsService, private _http: Http, private _httpHelpers: HttpHelpers, private _snackBar: MdSnackBar) {
        this.spinnerVisibility = false;
        this.feedbackForm = _fb.group({
            'senderName': ['', Validators.required],
            'senderEmail': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'message': ['', Validators.required]
        });
    }

    onSubmit(values: Object): void {
        this.spinnerVisibility = true;
        const feedback = {
            'SenderEmail': this.feedbackForm.get('senderName').value,
            'SenderName': this.feedbackForm.get('senderEmail').value,
            'Message': this.feedbackForm.get('message').value
        };
        const options = this._httpHelpers.createJsonRequest();
        this._http.post(this._urls.sendFeedback, JSON.stringify(feedback), options)
            .map(res => res.json())
            .subscribe(() => {
                this.feedbackForm.reset();
                const snackBar = this._snackBar.open("Успішно відправлено!", "Закрити", { duration: 5000 });
                snackBar.onAction().subscribe(() => {
                    snackBar.dismiss();
                });
            },
            () => {
                const snackBar = this._snackBar.open("Не вдалось відпавити. Спробуйте ще раз", "Закрити", { duration: 5000 });
                snackBar.onAction().subscribe(() => {
                    snackBar.dismiss();
                });
            },
            () => { this.spinnerVisibility = false; });   
    }
}