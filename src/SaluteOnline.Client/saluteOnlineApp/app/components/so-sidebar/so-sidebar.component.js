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
var constants_1 = require("../../styles/constants");
var menu_list_1 = require("../../configuration/menu-list");
var _ = require("lodash");
var SoSidebar = (function () {
    function SoSidebar(elementRef, state) {
        var _this = this;
        this.elementRef = elementRef;
        this.state = state;
        this.routes = _.cloneDeep(menu_list_1.menuList);
        this.isMenuCollapsed = false;
        this.isSidebarShouldCollapse = false;
        this.state.subscribe('menu.isCollapsed', function (isCollapsed) {
            _this.isMenuCollapsed = isCollapsed;
        });
    }
    SoSidebar.prototype.ngOnInit = function () {
        if (this.shouldSidebarCollapse()) {
            this.sidebarCollapse();
        }
    };
    SoSidebar.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateHeight(); });
    };
    SoSidebar.prototype.onWindowResize = function () {
        var isSidebarMustCollapse = this.shouldSidebarCollapse();
        if (isSidebarMustCollapse !== this.isSidebarShouldCollapse) {
        }
        this.isSidebarShouldCollapse = isSidebarMustCollapse;
        this.updateHeight();
    };
    SoSidebar.prototype.sidebarCollapseStatusChange = function (collapse) {
        this.isMenuCollapsed = collapse;
        this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    };
    SoSidebar.prototype.updateHeight = function () {
        this.menuHeight = this.elementRef.nativeElement.childNodes[0].clientHeight - 84;
    };
    SoSidebar.prototype.sidebarExpand = function () {
        this.sidebarCollapseStatusChange(false);
    };
    SoSidebar.prototype.sidebarCollapse = function () {
        this.sidebarCollapseStatusChange(true);
    };
    SoSidebar.prototype.shouldSidebarCollapse = function () {
        return window.innerWidth <= constants_1.layoutSizes.resolutionCollapseSidebar;
    };
    return SoSidebar;
}());
__decorate([
    core_1.HostListener('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SoSidebar.prototype, "onWindowResize", null);
SoSidebar = __decorate([
    core_1.Component({
        selector: 'so-sidebar',
        styles: [require('./so-sidebar.component.scss').toString()],
        template: require('./so-sidebar.component.html'),
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, global_state_1.GlobalState])
], SoSidebar);
exports.SoSidebar = SoSidebar;
//# sourceMappingURL=so-sidebar.component.js.map