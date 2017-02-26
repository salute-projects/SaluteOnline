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
var countries_service_1 = require("../../services/geo/countries.service");
var SoUserSettings = (function () {
    function SoUserSettings(_countriesService) {
        this._countriesService = _countriesService;
        this.countries = _countriesService.getCountries();
    }
    SoUserSettings.prototype.searchCountry = function (event) {
        var query = event.query;
        this.filteredContries = this.countries.filter(function (item) { return item.toLowerCase().indexOf(query.toLowerCase()) > -1; });
    };
    SoUserSettings.prototype.searchCity = function (event) {
        var _this = this;
        var query = event.query;
        this._countriesService.getCities("China", query).subscribe(function (result) { return _this.filteredCities = result; });
    };
    SoUserSettings.prototype.ngOnInit = function () {
    };
    SoUserSettings = __decorate([
        core_1.Component({
            selector: 'so-user-settings',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./user.settings.scss').toString()],
            template: require('./user.settings.html')
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof countries_service_1.CountriesService !== 'undefined' && countries_service_1.CountriesService) === 'function' && _a) || Object])
    ], SoUserSettings);
    return SoUserSettings;
    var _a;
}());
exports.SoUserSettings = SoUserSettings;
//# sourceMappingURL=user.settings.js.map