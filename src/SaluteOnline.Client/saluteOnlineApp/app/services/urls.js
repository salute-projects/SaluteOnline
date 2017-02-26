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
var UrlsService = (function () {
    function UrlsService() {
        this.identityServerUrl = 'http://localhost:9657/';
        this.apiUrl = 'http://localhost:43713/api/';
        this.loginEndpoint = this.identityServerUrl + 'connect/token';
        this.revokeEndpoint = this.identityServerUrl + 'connect/revocation';
        this.checkEmailUniquity = this.identityServerUrl + 'api/account/EmailUniquity';
        this.checkUsernameUniquity = this.identityServerUrl + 'api/account/UsernameUniquity';
        this.getCity = this.apiUrl + 'Geo/GetCity';
    }
    UrlsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UrlsService);
    return UrlsService;
}());
exports.UrlsService = UrlsService;
//# sourceMappingURL=urls.js.map