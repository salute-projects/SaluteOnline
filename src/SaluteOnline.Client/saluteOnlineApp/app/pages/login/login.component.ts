import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { LoginService } from "../../services/login.service";
import { UrlsService } from "../../services/urls";

@Component({
    selector: 'so-login',
    providers: [LoginService, UrlsService],
    encapsulation: ViewEncapsulation.None,
    styles: [require('./login.component.scss').toString()],
    template: require('./login.component.html')
})

export class SoLogin {
    form:FormGroup;
    name:AbstractControl;
    password:AbstractControl;

    constructor(fb: FormBuilder, private _loginService: LoginService) {
        this.form = fb.group({
            'name': '',
            'password': ''
        });
        this.name = this.form.controls['name'];
        this.password = this.form.controls['password'];
    }

    onSubmit(values: Object): void {
        this._loginService.login(this.name.value, this.password.value);
    }
}