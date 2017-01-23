import { FormGroup } from "@angular/forms";

export class EqualPasswordValidator {
     static validate(firstField: string, secondField: string) {
         return (c: FormGroup) => {
             return (c.controls && c.controls[firstField].value === c.controls[secondField].value) ? null : {
                 passwordEqual: {
                     valid: false
                 }
             }
         }
     }
} 