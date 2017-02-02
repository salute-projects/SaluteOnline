import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdInputModule, MdButtonModule } from "@angular/material";

import { SoRegister } from "./register.component";
import { routing } from "./register.routing";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MdInputModule, MdButtonModule, routing],
    declarations: [SoRegister]
})
export class RegisterModule {
}