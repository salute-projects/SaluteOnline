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
var dialog_component_1 = require("../../components/so-dialog/dialog.component");
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var IDialogProperties_1 = require("./IDialogProperties");
var SoDialogService = (function () {
    function SoDialogService(mdMdialog) {
        this.mdMdialog = mdMdialog;
    }
    SoDialogService.prototype.show = function (config, width, height, disableClose) {
        var _this = this;
        if (width === void 0) { width = 'auto'; }
        if (height === void 0) { height = 'auto'; }
        if (disableClose === void 0) { disableClose = false; }
        if (!config) {
            config = this.setDefaultConfig();
        }
        return new Promise(function (resolve) {
            var dialogRef = _this.mdMdialog.open(dialog_component_1.SoDialog, {
                width: width,
                height: height,
                data: config,
                disableClose: disableClose
            });
            dialogRef.afterClosed().subscribe(function (result) {
                resolve(result);
            });
        });
    };
    SoDialogService.prototype.setDefaultConfig = function () {
        return new IDialogProperties_1.DialogProperties();
    };
    return SoDialogService;
}());
SoDialogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [material_1.MdDialog])
], SoDialogService);
exports.SoDialogService = SoDialogService;
//# sourceMappingURL=dialog.service.js.map