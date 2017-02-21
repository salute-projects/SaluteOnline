import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { EmailValidator } from "../../services/validators/email.validator";
import { EqualPasswordValidator } from "../../services/validators/equal-passwords.validator";
import { EmailUniqueValidator } from "../../services/validators/email.unique.validator";
import { UsernameUniqueValidator } from "../../services/validators/username.unique.validator";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { LoginService } from "../../services/login.service";
import { UrlsService } from "../../services/urls";
import { MdSnackBar } from "@angular/material";

@Component({
    selector: 'so-register',
    providers: [LoginService, UrlsService],
    encapsulation: ViewEncapsulation.None,
    styles: [require('./register.component.scss').toString()],
    template: require('./register.component.html')
})

export class SoRegister implements OnInit, OnDestroy {
    form:FormGroup;
    name:AbstractControl;
    email:AbstractControl;
    password:AbstractControl;
    confirmPassword:AbstractControl;
    passwords:FormGroup;
    submitted = false;
    spinnerVisibility = false;
    subscription: any;

    constructor(fb: FormBuilder, public http: Http, private _loginService: LoginService, public snackBar: MdSnackBar, private _router: Router, private _urls: UrlsService) {
        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)]), (control: AbstractControl) => { return new UsernameUniqueValidator(http, _urls).validate(control) }],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate]), (control: AbstractControl) => { return new EmailUniqueValidator(http, _urls).validate(control) }],
            'passwords': fb.group({
                    'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                    'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
                },
                { validator: EqualPasswordValidator.validate('password', 'confirmPassword') })
        });

        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.passwords = this.form.controls['passwords'] as FormGroup;
        this.password = this.passwords.controls['password'];
        this.confirmPassword = this.passwords.controls["confirmPassword"];
    }

    onSubmit(values: Object): void {
        this.submitted = true;
        this.spinnerVisibility = true;
        const params = new URLSearchParams();
        params.set('Username', this.name.value);
        params.set('Password', this.password.value);
        params.set('Email', this.email.value);        

        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });

        this.http.post('http://localhost:9657/api/account', params.toString(), options)
            .map(res => res.json())
            .subscribe(
                () => {
                    this._loginService.login(this.name.value, this.password.value);
                },
                () => {
                    this.spinnerVisibility = false;
                    const snackBar = this.snackBar.open("Не вдалось зареєструватись", "Закрити", { duration: 10000 });
                    snackBar.onAction().subscribe(() => {
                        snackBar.dismiss();
                    });
                }
            );
    }

    ngOnInit(): void {
        this.subscription = this._loginService.getEmitter().subscribe((success: boolean) => {
            this.spinnerVisibility = false;
            if (success) {
                this._router.navigate(['pages']);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}