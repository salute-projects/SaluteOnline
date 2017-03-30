"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var codex_routing_1 = require("./codex.routing");
var codex_component_1 = require("./codex.component");
var primeng_1 = require("primeng/primeng");
var material_1 = require("@angular/material");
var CodexModule = (function () {
    function CodexModule() {
    }
    return CodexModule;
}());
CodexModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, codex_routing_1.routing, primeng_1.AccordionModule, material_1.MdTooltipModule],
        declarations: [codex_component_1.SoCodex],
        providers: []
    })
], CodexModule);
exports.CodexModule = CodexModule;
//# sourceMappingURL=codex.module.js.map