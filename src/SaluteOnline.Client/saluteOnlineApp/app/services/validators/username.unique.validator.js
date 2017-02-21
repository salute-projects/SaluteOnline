"use strict";
var http_1 = require("@angular/http");
var UsernameUniqueValidator = (function () {
    function UsernameUniqueValidator(_http, _urls) {
        this._http = _http;
        this._urls = _urls;
    }
    UsernameUniqueValidator.prototype.validate = function (c) {
        var _this = this;
        return new Promise(function (resolve) {
            var params = new http_1.URLSearchParams();
            params.set('username', c.value);
            return _this._http.get(_this._urls.checkUsernameUniquity, { search: params })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                return data
                    ? resolve({
                        usernameUnique: {
                            valid: false
                        }
                    }) : resolve(null);
            }, function () {
                return resolve({
                    usernameUnique: {
                        valid: false
                    }
                });
            });
        });
    };
    return UsernameUniqueValidator;
}());
exports.UsernameUniqueValidator = UsernameUniqueValidator;
//# sourceMappingURL=username.unique.validator.js.map