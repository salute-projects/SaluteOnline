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
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var urls_1 = require("../../services/urls");
var email_validator_1 = require("../../services/validators/email.validator");
var http_helpers_1 = require("../../services/http.helpers");
var material_1 = require("@angular/material");
var SoContacts = (function () {
    function SoContacts(_fb, _urls, _http, _httpHelpers, _snackBar) {
        this._fb = _fb;
        this._urls = _urls;
        this._http = _http;
        this._httpHelpers = _httpHelpers;
        this._snackBar = _snackBar;
        this.spinnerVisibility = false;
        this.feedbackForm = _fb.group({
            'senderName': ['', forms_1.Validators.required],
            'senderEmail': ['', forms_1.Validators.compose([forms_1.Validators.required, email_validator_1.EmailValidator.validate])],
            'message': ['', forms_1.Validators.required]
        });
    }
    SoContacts.prototype.onSubmit = function (values) {
        var _this = this;
        this.spinnerVisibility = true;
        var feedback = {
            'SenderEmail': this.feedbackForm.get('senderName').value,
            'SenderName': this.feedbackForm.get('senderEmail').value,
            'Message': this.feedbackForm.get('message').value
        };
        var options = this._httpHelpers.createJsonRequest();
        this._http.post(this._urls.sendFeedback, JSON.stringify(feedback), options)
            .map(function (res) { return res.json(); })
            .subscribe(function () {
            _this.feedbackForm.reset();
            var snackBar = _this._snackBar.open("Успішно відправлено!", "Закрити", { duration: 5000 });
            snackBar.onAction().subscribe(function () {
                snackBar.dismiss();
            });
        }, function () {
            var snackBar = _this._snackBar.open("Не вдалось відпавити. Спробуйте ще раз", "Закрити", { duration: 5000 });
            snackBar.onAction().subscribe(function () {
                snackBar.dismiss();
            });
        }, function () { _this.spinnerVisibility = false; });
    };
    return SoContacts;
}());
SoContacts = __decorate([
    core_1.Component({
        selector: 'so-contacts',
        providers: [urls_1.UrlsService],
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [require('./contacts.component.scss').toString()],
        template: require('./contacts.component.html')
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, urls_1.UrlsService, http_1.Http, http_helpers_1.HttpHelpers, material_1.MdSnackBar])
], SoContacts);
exports.SoContacts = SoContacts;
//# sourceMappingURL=contacts.component.js.map