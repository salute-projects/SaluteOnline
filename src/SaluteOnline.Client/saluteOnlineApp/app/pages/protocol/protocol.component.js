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
var PlayerEntry_1 = require("../../domain/PlayerEntry");
var SoProtocol = (function () {
    function SoProtocol() {
        this.players = new Array();
        for (var i = 0; i < 10; i++) {
            this.players.push(new PlayerEntry_1.PlayerEntry());
        }
    }
    return SoProtocol;
}());
SoProtocol = __decorate([
    core_1.Component({
        selector: 'so-protocol',
        providers: [],
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [require('./protocol.component.scss').toString()],
        template: require('./protocol.component.html')
    }),
    __metadata("design:paramtypes", [])
], SoProtocol);
exports.SoProtocol = SoProtocol;
//# sourceMappingURL=protocol.component.js.map