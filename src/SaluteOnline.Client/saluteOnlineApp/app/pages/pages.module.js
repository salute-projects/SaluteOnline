"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var pages_routing_1 = require("./pages.routing");
var pages_component_1 = require("./pages.component");
var so_header_component_1 = require("../components/so-header/so-header.component");
var so_sidebar_component_1 = require("../components/so-sidebar/so-sidebar.component");
var so_right_sidebar_component_1 = require("../components/so-right-sidebar/so-right-sidebar.component");
var so_menu_component_1 = require("../components/so-menu/so-menu.component");
var so_menuitem_component_1 = require("../components/so-menuitem/so-menuitem.component");
var material_1 = require("@angular/material");
var login_service_1 = require("../services/login.service");
var angular2_jwt_1 = require("angular2-jwt");
var urls_1 = require("../services/urls");
var players_service_1 = require("../services/players/players.service");
var global_state_1 = require("../services/global.state");
var auth_guard_service_1 = require("../services/auth-guard.service");
var PagesModule = (function () {
    function PagesModule() {
    }
    return PagesModule;
}());
PagesModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, material_1.MdMenuModule, material_1.MdButtonModule, pages_routing_1.routing],
        providers: [global_state_1.GlobalState, login_service_1.LoginService, angular2_jwt_1.AuthHttp, urls_1.UrlsService, players_service_1.PlayersService, auth_guard_service_1.AuthGuard,
            angular2_jwt_1.provideAuth({
                headerName: 'Authorization',
                headerPrefix: 'bearer',
                tokenName: 'token',
                tokenGetter: (function () { return localStorage.getItem('token'); }),
                globalHeaders: [{ 'Content-Type': 'application/x-www-form-urlencoded' }],
                noJwtError: true
            })],
        declarations: [pages_component_1.Pages, so_header_component_1.SoHeader, so_sidebar_component_1.SoSidebar, so_right_sidebar_component_1.SoRightSidebar, so_menu_component_1.SoMenu, so_menuitem_component_1.SoMenuItem]
    })
], PagesModule);
exports.PagesModule = PagesModule;
//# sourceMappingURL=pages.module.js.map