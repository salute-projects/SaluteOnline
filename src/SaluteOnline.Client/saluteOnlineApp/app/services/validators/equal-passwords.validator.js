"use strict";
var EqualPasswordValidator = (function () {
    function EqualPasswordValidator() {
    }
    EqualPasswordValidator.validate = function (firstField, secondField) {
        return function (c) {
            return (c.controls && c.controls[firstField].value === c.controls[secondField].value) ? null : {
                passwordEqual: {
                    valid: false
                }
            };
        };
    };
    return EqualPasswordValidator;
}());
exports.EqualPasswordValidator = EqualPasswordValidator;
//# sourceMappingURL=equal-passwords.validator.js.map