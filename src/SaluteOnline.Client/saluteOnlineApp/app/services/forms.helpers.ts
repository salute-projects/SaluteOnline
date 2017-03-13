import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class FormsHelpers {
    
    assignFormControlsByConvention(thislink: any, form: FormGroup, properties: string[]) {
        if (!properties.length) return;
        properties.forEach((item) => {
            thislink[item] = form.controls[item];
        });
    }
}