import { AbstractControl } from "@angular/forms";

export class EmailValidator {
    static validate(c: AbstractControl) {
        const emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        return emailRegexp.test(c.value)
            ? null
            : {
                validateEmail: {
                    valid: false
                }
            };
    }
}