import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SoRegister } from "./register.component";
import { routing } from "./register.routing";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, routing],
    declarations: [SoRegister]
})
export class RegisterModule {
}