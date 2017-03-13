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
var forms_helpers_1 = require("../../services/forms.helpers");
var http_helpers_1 = require("../../services/http.helpers");
var default_configs_1 = require("../../services/default.configs");
var equal_passwords_validator_1 = require("../../services/validators/equal-passwords.validator");
var global_state_1 = require("../../services/global.state");
var angular2_jwt_1 = require('angular2-jwt');
var material_1 = require("@angular/material");
var DataStructures_1 = require("../../domain/DataStructures");
var moment = require("moment");
var SoUserSettings = (function () {
    function SoUserSettings(_geoService, fb, _http, _urls, _authHttp, _snackBar, _state, _formsHelpers, _httpHelpers) {
        this._geoService = _geoService;
        this._http = _http;
        this._urls = _urls;
        this._authHttp = _authHttp;
        this._snackBar = _snackBar;
        this._state = _state;
        this._formsHelpers = _formsHelpers;
        this._httpHelpers = _httpHelpers;
        this.pickerOptions = default_configs_1.pickerOptions;
        this.countries = _geoService.getCountries();
        this.form = fb.group({
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, email_validator_1.EmailValidator.validate])],
            'name': ['', forms_1.Validators.compose([forms_1.Validators.minLength(4), forms_1.Validators.maxLength(50)])],
            'lastname': ['', forms_1.Validators.compose([forms_1.Validators.minLength(4), forms_1.Validators.maxLength(50)])],
            'phoneMain': [''],
            'phoneSecond': [''],
            'state': [''],
            'city': [''],
            'birthday': ['']
        });
        this._formsHelpers.assignFormControlsByConvention(this, this.form, ['email', 'name', 'lastname', 'phoneMain', 'phoneSecond', 'birthday']);
        this.stateControl = this.form.controls['state'];
        this.cityControl = this.form.controls['city'];
        this.privacyForm = fb.group({
            'hideProfile': [''],
            'changePassword': [false],
            'passwords': fb.group({
                'newPassword': ['', forms_1.Validators.minLength(4)],
                'newPasswordConfirm': ['', forms_1.Validators.minLength(4)]
            }, { validator: equal_passwords_validator_1.EqualPasswordValidator.validate('newPassword', 'newPasswordConfirm') })
        });
        this._formsHelpers.assignFormControlsByConvention(this, this.privacyForm, ['changePassword', 'hideProfile']);
        this.passwords = this.privacyForm.controls['passwords'];
        this.newPassword = this.passwords.controls['newPassword'];
        this.newPasswordConfirm = this.passwords.controls["newPasswordConfirm"];
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
        var _this = this;
        var pars = this._httpHelpers.createFormEncodedRequest([
            new DataStructures_1.StringsKeyValue('Email', this.email.value),
            new DataStructures_1.StringsKeyValue('Name', this.name.value),
            new DataStructures_1.StringsKeyValue('LastName', this.lastname.value),
            new DataStructures_1.StringsKeyValue('PhoneMain', this.phoneMain.value),
            new DataStructures_1.StringsKeyValue('PhoneSecond', this.phoneSecond.value),
            new DataStructures_1.StringsKeyValue('State', this.stateControl.value),
            new DataStructures_1.StringsKeyValue('City', this.cityControl.value),
            new DataStructures_1.StringsKeyValue('Birthday', this.birthday.value.toISOString())
        ]);
        this._authHttp.patch(this._urls.updateUser, pars.params, pars.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (result) {
            _this._state.setUser(result);
            var snackBar = _this._snackBar.open("Збережено!", "Закрити", { duration: 5000 });
            snackBar.onAction().subscribe(function () {
                snackBar.dismiss();
            });
        }, function () {
            var snackBar = _this._snackBar.open("Не вдалось зберегти зміни", "Закрити", { duration: 10000 });
            snackBar.onAction().subscribe(function () {
                snackBar.dismiss();
            });
        });
    };
    SoUserSettings.prototype.onPrivacySubmit = function (values) {
        var _this = this;
        var params = this._httpHelpers.createFormEncodedRequest([
            new DataStructures_1.StringsKeyValue('HideProfile', this.hideProfile.value)
        ]);
        if (this.changePassword.value) {
            params.params.set('NewPassword', this.newPassword.value);
        }
        this._authHttp.patch(this._urls.updateUserPrivacy, params.params, params.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (result) {
            _this._state.setUser(result);
            var snackBar = _this._snackBar.open("Збережено!", "Закрити", { duration: 5000 });
            snackBar.onAction().subscribe(function () {
                snackBar.dismiss();
            });
        }, function () {
            var snackBar = _this._snackBar.open("Не вдалось зберегти зміни", "Закрити", { duration: 10000 });
            snackBar.onAction().subscribe(function () {
                snackBar.dismiss();
            });
        });
    };
    SoUserSettings.prototype.setUserValues = function (user) {
        this.email.setValue(user.email);
        this.name.setValue(user.name);
        this.lastname.setValue(user.lastName);
        this.phoneMain.setValue(user.phoneMain);
        this.phoneSecond.setValue(user.phoneSecond);
        this.birthday.setValue(moment(user.birthday).toDate());
        this.stateControl.setValue(user.state);
        this.cityControl.setValue(user.city);
        this.avatar = user.avatar;
    };
    SoUserSettings.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._authHttp.get(this._urls.getLoggedUser)
            .map(function (res) { return res.json(); })
            .subscribe(function (result) {
            _this.user = result;
            _this.setUserValues(result);
        }, function () {
            var snackBar = _this._snackBar.open("Не вдалось отримати профіль", "Закрити", { duration: 10000 });
            snackBar.onAction()
                .subscribe(function () {
                snackBar.dismiss();
            });
        });
    };
    SoUserSettings.prototype.onBeforeSend = function (event) {
        var accessToken = localStorage.getItem('token');
        event.xhr.setRequestHeader('Authorization', "bearer " + accessToken);
    };
    SoUserSettings.prototype.onUpload = function (event) {
        this.avatar = event.xhr.response;
    };
    SoUserSettings = __decorate([
        core_1.Component({
            selector: 'so-user-settings',
            providers: [urls_1.UrlsService],
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./user.settings.scss').toString()],
            template: require('./user.settings.html')
        }), 
        __metadata('design:paramtypes', [geo_service_1.GeoService, forms_1.FormBuilder, http_1.Http, urls_1.UrlsService, angular2_jwt_1.AuthHttp, material_1.MdSnackBar, global_state_1.GlobalState, forms_helpers_1.FormsHelpers, http_helpers_1.HttpHelpers])
    ], SoUserSettings);
    return SoUserSettings;
}());
exports.SoUserSettings = SoUserSettings;
//# sourceMappingURL=user.settings.js.map