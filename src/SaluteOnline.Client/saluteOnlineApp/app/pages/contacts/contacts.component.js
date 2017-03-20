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
var DataStructures_1 = require("../../domain/DataStructures");
var SoContacts = (function () {
    function SoContacts(_fb, _urls, _http, _httpHelpers) {
        this._fb = _fb;
        this._urls = _urls;
        this._http = _http;
        this._httpHelpers = _httpHelpers;
        this.feedbackForm = _fb.group({
            'senderName': ['', forms_1.Validators.required],
            'senderEmail': ['', forms_1.Validators.compose([forms_1.Validators.required, email_validator_1.EmailValidator.validate])],
            'message': ['', forms_1.Validators.required]
        });
    }
    SoContacts.prototype.onSubmit = function (values) {
        var pars = this._httpHelpers.createFormEncodedRequest([
            new DataStructures_1.StringsKeyValue('SenderEmail', this.feedbackForm.get('senderName').value),
            new DataStructures_1.StringsKeyValue('SenderName', this.feedbackForm.get('senderEmail').value),
            new DataStructures_1.StringsKeyValue('Message', this.feedbackForm.get('message').value)
        ]);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        this._http.post(this._urls.sendFeedback, pars.params, pars.options)
            .map(function (res) { return res.json(); })
            .subscribe(function () {
        }, function () { });
    };
    SoContacts = __decorate([
        core_1.Component({
            selector: 'so-contacts',
            providers: [urls_1.UrlsService],
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./contacts.component.scss').toString()],
            template: require('./contacts.component.html')
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, urls_1.UrlsService, http_1.Http, http_helpers_1.HttpHelpers])
    ], SoContacts);
    return SoContacts;
}());
exports.SoContacts = SoContacts;
//# sourceMappingURL=contacts.component.js.map