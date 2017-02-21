"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var email_validator_1 = require("../../services/validators/email.validator");
var equal_passwords_validator_1 = require("../../services/validators/equal-passwords.validator");
var email_unique_validator_1 = require("../../services/validators/email.unique.validator");
var username_unique_validator_1 = require("../../services/validators/username.unique.validator");
var http_1 = require("@angular/http");
var login_service_1 = require("../../services/login.service");
var urls_1 = require("../../services/urls");
var material_1 = require("@angular/material");
var SoRegister = (function () {
    function SoRegister(fb, http, _loginService, snackBar, _router, _urls) {
        this.http = http;
        this._loginService = _loginService;
        this.snackBar = snackBar;
        this._router = _router;
        this._urls = _urls;
        this.submitted = false;
        this.spinnerVisibility = false;
        this.form = fb.group({
            'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)]), function (control) { return new username_unique_validator_1.UsernameUniqueValidator(http, _urls).validate(control); }],
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, email_validator_1.EmailValidator.validate]), function (control) { return new email_unique_validator_1.EmailUniqueValidator(http, _urls).validate(control); }],
            'passwords': fb.group({
                'password': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
                'confirmPassword': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])]
            }, { validator: equal_passwords_validator_1.EqualPasswordValidator.validate('password', 'confirmPassword') })
        });
        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.passwords = this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.confirmPassword = this.passwords.controls["confirmPassword"];
    }
    SoRegister.prototype.onSubmit = function (values) {
        var _this = this;
        this.submitted = true;
        this.spinnerVisibility = true;
        var params = new http_1.URLSearchParams();
        params.set('Username', this.name.value);
        params.set('Password', this.password.value);
        params.set('Email', this.email.value);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post('http://localhost:9657/api/account', params.toString(), options)
            .map(function (res) { return res.json(); })
            .subscribe(function () {
            _this._loginService.login(_this.name.value, _this.password.value);
        }, function () {
            _this.spinnerVisibility = false;
            var snackBar = _this.snackBar.open("Не вдалось зареєструватись", "Закрити", { duration: 10000 });
            snackBar.onAction().subscribe(function () {
                snackBar.dismiss();
            });
        });
    };
    SoRegister.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._loginService.getEmitter().subscribe(function (success) {
            _this.spinnerVisibility = false;
            if (success) {
                _this._router.navigate(['pages']);
            }
        });
    };
    SoRegister.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SoRegister = __decorate([
        core_1.Component({
            selector: 'so-register',
            providers: [login_service_1.LoginService, urls_1.UrlsService],
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./register.component.scss').toString()],
            template: require('./register.component.html')
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, http_1.Http, login_service_1.LoginService, material_1.MdSnackBar, router_1.Router, urls_1.UrlsService])
    ], SoRegister);
    return SoRegister;
}());
exports.SoRegister = SoRegister;
//# sourceMappingURL=register.component.js.map