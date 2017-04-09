"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var protocol_routing_1 = require("./protocol.routing");
var protocol_component_1 = require("./protocol.component");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var primeng_1 = require("primeng/primeng");
var ProtocolModule = (function () {
    function ProtocolModule() {
    }
    return ProtocolModule;
}());
ProtocolModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, material_1.MdInputModule, material_1.MdSlideToggleModule, material_1.MdButtonModule, material_1.MdSelectModule, material_1.MdCheckboxModule, material_1.MdRadioModule, material_1.MdTooltipModule, forms_1.FormsModule, primeng_1.AutoCompleteModule, protocol_routing_1.routing],
        declarations: [protocol_component_1.SoProtocol],
        providers: []
    })
], ProtocolModule);
exports.ProtocolModule = ProtocolModule;
//# sourceMappingURL=protocol.module.js.map