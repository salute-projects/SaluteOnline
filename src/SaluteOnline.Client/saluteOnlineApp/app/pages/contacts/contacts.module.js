"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var contacts_component_1 = require("./contacts.component");
var contacts_routing_1 = require("./contacts.routing");
var forms_1 = require("@angular/forms");
var autosize_directive_1 = require("../../directives/autosize.directive");
var http_helpers_1 = require("../../services/http.helpers");
var ContactsModule = (function () {
    function ContactsModule() {
    }
    return ContactsModule;
}());
ContactsModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, contacts_routing_1.routing, material_1.MdCardModule, material_1.MdInputModule, material_1.MdButtonModule, material_1.MdProgressSpinnerModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        declarations: [contacts_component_1.SoContacts, autosize_directive_1.Autosize],
        providers: [http_helpers_1.HttpHelpers]
    })
], ContactsModule);
exports.ContactsModule = ContactsModule;
//# sourceMappingURL=contacts.module.js.map