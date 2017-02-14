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
var http_1 = require("@angular/http");
var angular2_jwt_1 = require('angular2-jwt');
var urls_1 = require("./urls");
var router_1 = require("@angular/router");
var LoginService = (function () {
    function LoginService(http, authHttp, _urlsService, _router) {
        this.http = http;
        this.authHttp = authHttp;
        this._urlsService = _urlsService;
        this._router = _router;
    }
    LoginService.prototype.login = function (username, password) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('username', username);
        params.set('password', password);
        params.set('grant_type', 'password');
        params.set('client_id', 'salute_web_client');
        params.set('client_secret', '4295960dae5e9e6aab6fe53f7b720f79358274cf83a0f0041386a0f9983dc8f5');
        params.set('scope', 'SaluteOnlineApi offline_access');
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this._urlsService.loginEndpoint, params.toString(), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            _this._router.navigate(['pages']);
        }, function (err) { return console.log(err); }, function () { return console.log('empty'); });
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, urls_1.UrlsService, router_1.Router])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map