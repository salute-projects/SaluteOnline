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
var global_state_1 = require("../../services/global.state");
var so_menu_service_1 = require("./so-menu.service");
var SoMenu = (function () {
    function SoMenu(router, service, state) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.state = state;
        this.menuRoutes = [];
        this.sidebarCollapsed = false;
        this.expandMenu = new core_1.EventEmitter();
        this.outOfArea = -200;
        this.onRouteChange = this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                if (_this.menuItems) {
                    _this.selectMenuAndNotify();
                }
                else {
                    setTimeout(function () { return _this.selectMenuAndNotify(); });
                }
            }
        });
    }
    SoMenu.prototype.selectMenuAndNotify = function () {
        if (this.menuItems) {
            this.menuItems = this.service.selectMenuItem(this.menuItems);
            this.state.notifyDataChanged('menu.activeLink', this.service.getCurrentItem());
        }
    };
    SoMenu.prototype.ngOnInit = function () {
        this.menuItems = this.service.convertRoutesToMenus(this.menuRoutes);
    };
    SoMenu.prototype.ngOnDestroy = function () {
        this.onRouteChange.unsubscribe();
    };
    SoMenu.prototype.hoverItem = function ($event) {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
    };
    SoMenu.prototype.toggleSubMenu = function ($event) {
        var submenu = jQuery($event.currentTarget).next();
        if (this.sidebarCollapsed) {
            this.expandMenu.emit(null);
            if (!$event.item.expanded) {
                $event.item.expanded = true;
            }
        }
        else {
            $event.item.expanded = !$event.item.expanded;
            submenu.slideToggle();
        }
        return false;
    };
    return SoMenu;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SoMenu.prototype, "menuRoutes", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SoMenu.prototype, "sidebarCollapsed", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SoMenu.prototype, "menuHeight", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SoMenu.prototype, "expandMenu", void 0);
SoMenu = __decorate([
    core_1.Component({
        selector: 'so-menu',
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [require('./so-menu.component.scss').toString()],
        template: require('./so-menu.component.html'),
        providers: [so_menu_service_1.SoMenuService]
    }),
    __metadata("design:paramtypes", [router_1.Router, so_menu_service_1.SoMenuService, global_state_1.GlobalState])
], SoMenu);
exports.SoMenu = SoMenu;
//# sourceMappingURL=so-menu.component.js.map