import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { EmailValidator } from "../../services/validators/email.validator";
import { EqualPasswordValidator } from "../../services/validators/equal-passwords.validator";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { LoginService } from "../../services/login.service";
import { UrlsService } from "../../services/urls";

@Component({
    selector: 'so-register',
    providers: [LoginService, UrlsService],
    encapsulation: ViewEncapsulation.None,
    styles: [require('./register.component.scss').toString()],
    template: require('./register.component.html')
})

export class SoRegister {
    form:FormGroup;
    name:AbstractControl;
    email:AbstractControl;
    password:AbstractControl;
    confirmPassword:AbstractControl;
    passwords:FormGroup;
    submitted = false;

    constructor(fb: FormBuilder, public http: Http, private _loginService: LoginService) {
        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
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
        const params = new URLSearchParams();
        params.set('Username', this.name.value);
        params.set('Password', this.password.value);
        params.set('Email', this.email.value);        

        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });

        this.http.post('http://localhost:9657/api/account', params.toString(), options)
            .map(res => res.json())
            .subscribe(
                (data: any) => {
                    this._loginService.login(this.name.value, this.password.value);
                },
                err => console.log(err),
                () => console.log('empty')
            );
    }
}