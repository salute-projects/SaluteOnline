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
var LoadingPageComponent = (function () {
    function LoadingPageComponent() {
        this.name = "Loading Page Component";
        this.loadingScreenVisibility = true;
    }
    LoadingPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.loadingScreenVisibility = false;
        }, 5000);
    };
    LoadingPageComponent = __decorate([
        core_1.Component({
            selector: 'loading-page',
            template: require('./loading-page.component.html'),
            styles: [require('./loading-page.component.scss').toString()]
        }), 
        __metadata('design:paramtypes', [])
    ], LoadingPageComponent);
    return LoadingPageComponent;
}());
exports.LoadingPageComponent = LoadingPageComponent;
//# sourceMappingURL=loading-page.component.js.map