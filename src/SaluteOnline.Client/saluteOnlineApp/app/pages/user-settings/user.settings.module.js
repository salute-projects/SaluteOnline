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
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var forms_helpers_1 = require("../../services/forms.helpers");
var http_helpers_1 = require("../../services/http.helpers");
var user_settings_1 = require("./user.settings");
var user_settings_routing_1 = require("./user.settings.routing");
var geo_service_1 = require("../../services/geo/geo.service");
var primeng_1 = require("primeng/primeng");
var SoUserSettingsModule = (function () {
    function SoUserSettingsModule() {
    }
    SoUserSettingsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, material_1.MdTabsModule, material_1.MdCardModule, material_1.MdInputModule, material_1.MdButtonModule, material_1.MdCheckboxModule,
                primeng_1.AutoCompleteModule, primeng_1.CalendarModule, primeng_1.FileUploadModule, user_settings_routing_1.routing, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            providers: [geo_service_1.GeoService, forms_helpers_1.FormsHelpers, http_helpers_1.HttpHelpers],
            declarations: [user_settings_1.SoUserSettings]
        }), 
        __metadata('design:paramtypes', [])
    ], SoUserSettingsModule);
    return SoUserSettingsModule;
}());
exports.SoUserSettingsModule = SoUserSettingsModule;
//# sourceMappingURL=user.settings.module.js.map