import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
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

export class SoLogin implements OnInit, OnDestroy {
    form:FormGroup;
    name:AbstractControl;
    password:AbstractControl;
    spinnerVisibility = false;
    subsctiption: any;

    constructor(fb: FormBuilder, private _loginService: LoginService, private _router: Router) {
        this.form = fb.group({
            'name': '',
            'password': ''
        });
        this.name = this.form.controls['name'];
        this.password = this.form.controls['password'];
    }

    onSubmit(values: Object): void {
        this.spinnerVisibility = true;
        this._loginService.login(this.name.value, this.password.value);
    }

    ngOnInit(): void {
         this.subsctiption = this._loginService.getEmitter().subscribe((success: boolean) => {
             this.spinnerVisibility = success;
             if (success) {
                 this._router.navigate(['pages']);
             }
         });
    }

    ngOnDestroy(): void {
        this.subsctiption.unsubscribe();
    }
}