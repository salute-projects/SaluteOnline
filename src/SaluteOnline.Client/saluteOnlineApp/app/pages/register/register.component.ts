import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { EmailValidator } from "../../services/validators/email.validator";
import { EqualPasswordValidator } from "../../services/validators/equal-passwords.validator";

@Component({
    selector: 'so-register',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./register.component.scss').toString()],
    template: require('./register.component.html')
})

export class SoRegister {
    form:FormGroup;
    name:AbstractControl;
    email:AbstractControl;
    password:AbstractControl;
    confirmPassword:AbstractControl;
    passwords:FormGroup;
    submitted = false;

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'passwords': fb.group({
                    'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                    'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
                },
                { validator: EqualPasswordValidator.validate('password', 'confirmPassword') })
        });

        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.passwords = this.form.controls['passwords'] as FormGroup;
        this.password = this.passwords.controls['password'];
        this.confirmPassword = this.passwords.controls["confirmPassword"];
    }

    onSubmit(values: Object): void {
        this.submitted = true;
    }
}