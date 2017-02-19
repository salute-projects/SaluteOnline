"use strict";
var async_validation_service_1 = require("./async.validation.service");
var http_1 = require("@angular/http");
var EmailUniqueValidator = (function () {
    function EmailUniqueValidator(_http, _urls) {
        this._http = _http;
        this._urls = _urls;
    }
    EmailUniqueValidator.prototype.validate = function (c) {
        var _this = this;
        return async_validation_service_1.AsyncObservableValidator.create(function () { return new Promise(function () {
            var params = new http_1.URLSearchParams();
            params.set('email', c.value);
            _this._http.get(_this._urls.checkEmailUniquity, { search: params })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                return data ? null : {
                    emailUnique: {
                        valid: false
                    }
                };
            }, function () {
                return {
                    emailUnique: {
                        valid: false
                    }
                };
            });
        }); });
    };
    return EmailUniqueValidator;
}());
exports.EmailUniqueValidator = EmailUniqueValidator;
//# sourceMappingURL=email.unique.validator.js.map