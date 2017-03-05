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
var geo_service_1 = require("../../services/geo/geo.service");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var urls_1 = require("../../services/urls");
var email_validator_1 = require("../../services/validators/email.validator");
var angular2_jwt_1 = require('angular2-jwt');
var SoUserSettings = (function () {
    function SoUserSettings(_geoService, fb, _http, _urls, _authHttp) {
        this._geoService = _geoService;
        this._http = _http;
        this._urls = _urls;
        this._authHttp = _authHttp;
        this.submitted = false;
        this.pickerOptions = {
            minDateValue: new Date('1950/01/01'),
            maxDateValue: new Date('2010/12/31'),
            locale: {
                firstDayOfWeek: 0,
                dayNames: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
                dayNamesShort: ["Нед", "Пон", "Вів", "Сер", "Чет", "Птн", "Суб"],
                dayNamesMin: ["Н", "П", "В", "С", "Ч", "Пт", "Сб"],
                monthNames: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
                monthNamesShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"]
            }
        };
        this.countries = _geoService.getCountries();
        this.form = fb.group({
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, email_validator_1.EmailValidator.validate])],
            'name': ['', forms_1.Validators.compose([forms_1.Validators.minLength(4), forms_1.Validators.maxLength(50)])],
            'lastname': ['', forms_1.Validators.compose([forms_1.Validators.minLength(4), forms_1.Validators.maxLength(50)])],
            'phoneMain': ['', forms_1.Validators.compose([forms_1.Validators.pattern('/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g')])],
            'phoneSecond': ['', forms_1.Validators.compose([forms_1.Validators.pattern('/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g')])],
            'state': [''],
            'city': [''],
            'birthday': ['']
        });
        this.email = this.form.controls['email'];
        this.name = this.form.controls['name'];
        this.lastname = this.form.controls['lastname'];
        this.phoneMain = this.form.controls['phoneMain'];
        this.phoneSecond = this.form.controls['phoneSecond'];
        this.stateControl = this.form.controls['state'];
        this.cityControl = this.form.controls['city'];
        this.birthday = this.form.controls['birthday'];
    }
    SoUserSettings.prototype.searchCountry = function (event) {
        var query = event.query;
        this.filteredContries = this.countries.filter(function (item) { return item.toLowerCase().indexOf(query.toLowerCase()) > -1; });
    };
    SoUserSettings.prototype.searchCity = function (event) {
        var query = event.query;
        if (this.stateControl.value.toLowerCase() === 'україна') {
            this.filteredCities = this._geoService.getCities(this.stateControl.value, query);
        }
    };
    SoUserSettings.prototype.onSubmit = function (values) {
        this.submitted = true;
        var params = new http_1.URLSearchParams();
        params.set('Email', this.email.value);
        params.set('Name', this.name.value);
        params.set('LastName', this.lastname.value);
        params.set('PhoneMain', this.phoneMain.value);
        params.set('PhoneSecond', this.phoneSecond.value);
        params.set('State', this.stateControl.value);
        params.set('City', this.cityControl.value);
        params.set('Birthday', this.birthday.value);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this._authHttp.patch(this._urls.updateUser, params.toString(), options)
            .map(function (res) { return res.json(); })
            .subscribe();
    };
    SoUserSettings.prototype.ngOnInit = function () {
    };
    SoUserSettings = __decorate([
        core_1.Component({
            selector: 'so-user-settings',
            providers: [urls_1.UrlsService],
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./user.settings.scss').toString()],
            template: require('./user.settings.html')
        }), 
        __metadata('design:paramtypes', [geo_service_1.GeoService, forms_1.FormBuilder, http_1.Http, urls_1.UrlsService, angular2_jwt_1.AuthHttp])
    ], SoUserSettings);
    return SoUserSettings;
}());
exports.SoUserSettings = SoUserSettings;
//# sourceMappingURL=user.settings.js.map