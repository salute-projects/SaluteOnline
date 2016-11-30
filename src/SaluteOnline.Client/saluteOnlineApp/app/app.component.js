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
var core_1 = require('@angular/core');
var global_state_1 = require('./services/global.state');
var so_loading_service_1 = require('./services/so-loading.service');
var AppComponent = (function () {
    function AppComponent(state, loader) {
        var _this = this;
        this.state = state;
        this.loader = loader;
        this.isMenuCollapsed = false;
        this.loader.show();
        this.state.subscribe('menu.collapsed', function (isCollapsed) {
            _this.isMenuCollapsed = isCollapsed;
        });
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.loader.hide(500);
    };
    AppComponent = __decorate([
        core_1.Component(({
            selector: 'so-app',
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [global_state_1.GlobalState, so_loading_service_1.SoLoader],
            template: require('./app.template.html'),
            styles: [require('./app.component.scss').toString()]
        })), 
        __metadata('design:paramtypes', [global_state_1.GlobalState, so_loading_service_1.SoLoader])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map