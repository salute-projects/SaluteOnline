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
var forms_1 = require("@angular/forms");
var email_validator_1 = require("../../services/validators/email.validator");
var equal_passwords_validator_1 = require("../../services/validators/equal-passwords.validator");
var http_1 = require("@angular/http");
var login_service_1 = require("../../services/login.service");
var SoRegister = (function () {
    function SoRegister(fb, http, _loginService) {
        this.http = http;
        this._loginService = _loginService;
        this.submitted = false;
        this.form = fb.group({
            'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, email_validator_1.EmailValidator.validate])],
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
        var params = new http_1.URLSearchParams();
        params.set('Username', this.name.value);
        params.set('Password', this.password.value);
        params.set('Email', this.email.value);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post('http://localhost:43713/api/user', params.toString(), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this._loginService.login(_this.name.value, _this.password.value);
        }, function (err) { return console.log(err); }, function () { return console.log('empty'); });
    };
    SoRegister = __decorate([
        core_1.Component({
            selector: 'so-register',
            providers: [login_service_1.LoginService],
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./register.component.scss').toString()],
            template: require('./register.component.html')
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, http_1.Http, login_service_1.LoginService])
    ], SoRegister);
    return SoRegister;
}());
exports.SoRegister = SoRegister;
//# sourceMappingURL=register.component.js.map