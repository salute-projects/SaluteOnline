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
var common_1 = require("@angular/common");
var main_page_component_1 = require('./main-page.component');
var main_page_routing_1 = require('./main-page.routing');
var material_1 = require("@angular/material");
var MainPageModule = (function () {
    function MainPageModule() {
    }
    MainPageModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, main_page_routing_1.routing, material_1.MdButtonModule, material_1.MdTooltipModule],
            declarations: [main_page_component_1.MainPage]
        }), 
        __metadata('design:paramtypes', [])
    ], MainPageModule);
    return MainPageModule;
}());
exports.MainPageModule = MainPageModule;
//# sourceMappingURL=main-page.module.js.map