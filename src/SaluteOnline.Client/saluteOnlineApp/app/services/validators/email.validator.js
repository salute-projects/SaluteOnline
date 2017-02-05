"use strict";
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.validate = function (c) {
        var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return emailRegexp.test(c.value)
            ? null
            : {
                validateEmail: {
                    valid: false
                }
            };
    };
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;
//# sourceMappingURL=email.validator.js.map