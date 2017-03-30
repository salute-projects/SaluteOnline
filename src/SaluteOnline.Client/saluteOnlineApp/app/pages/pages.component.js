"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var so_header_component_1 = require("../components/so-header/so-header.component");
var so_sidebar_component_1 = require("../components/so-sidebar/so-sidebar.component");
var so_right_sidebar_component_1 = require("../components/so-right-sidebar/so-right-sidebar.component");
var Pages = (function () {
    function Pages() {
    }
    return Pages;
}());
Pages = __decorate([
    core_1.Component(({
        selector: 'pages',
        declarations: [so_header_component_1.SoHeader, so_sidebar_component_1.SoSidebar, so_right_sidebar_component_1.SoRightSidebar],
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [],
        template: require('./pages-template.html')
    }))
], Pages);
exports.Pages = Pages;
//# sourceMappingURL=pages.component.js.map