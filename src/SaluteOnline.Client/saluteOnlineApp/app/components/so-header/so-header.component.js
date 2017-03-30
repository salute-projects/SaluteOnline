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
var global_state_1 = require("../../services/global.state");
var login_service_1 = require("../../services/login.service");
var SoHeader = (function () {
    function SoHeader(state, _loginService) {
        var _this = this;
        this.state = state;
        this._loginService = _loginService;
        this.isMenuCollapsed = false;
        this.userLogged = this.state.loggedIn();
        this.state.subscribe('menu.isCollapsed', function (isCollapsed) {
            _this.isMenuCollapsed = isCollapsed;
        });
    }
    SoHeader.prototype.toggleMenu = function () {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    };
    SoHeader.prototype.logout = function () {
        this._loginService.logout();
        this.userLogged = this.state.loggedIn();
    };
    SoHeader.prototype.getUsername = function () {
        return localStorage.getItem('username');
    };
    SoHeader.prototype.ngOnInit = function () {
        var _this = this;
        this.state.getUser.subscribe(function (o) { return _this.user = o; });
    };
    return SoHeader;
}());
SoHeader = __decorate([
    core_1.Component({
        selector: 'so-header',
        styles: [require('./so-header.component.scss').toString()],
        template: require('./so-header.component.html'),
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [global_state_1.GlobalState, login_service_1.LoginService])
], SoHeader);
exports.SoHeader = SoHeader;
//# sourceMappingURL=so-header.component.js.map