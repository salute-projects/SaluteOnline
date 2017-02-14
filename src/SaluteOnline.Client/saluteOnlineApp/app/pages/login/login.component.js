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
var login_service_1 = require("../../services/login.service");
var urls_1 = require("../../services/urls");
var SoLogin = (function () {
    function SoLogin(fb, _loginService) {
        this._loginService = _loginService;
        this.form = fb.group({
            'name': '',
            'password': ''
        });
        this.name = this.form.controls['name'];
        this.password = this.form.controls['password'];
    }
    SoLogin.prototype.onSubmit = function (values) {
        this._loginService.login(this.name.value, this.password.value);
    };
    SoLogin = __decorate([
        core_1.Component({
            selector: 'so-register',
            providers: [login_service_1.LoginService, urls_1.UrlsService],
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./login.component.scss').toString()],
            template: require('./login.component.html')
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, login_service_1.LoginService])
    ], SoLogin);
    return SoLogin;
}());
exports.SoLogin = SoLogin;
//# sourceMappingURL=login.component.js.map