import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdInputModule, MdButtonModule, MdProgressSpinnerModule } from "@angular/material";
import { HttpModule, JsonpModule } from "@angular/http";

import { SoRegister } from "./register.component";
import { routing } from "./register.routing";

import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MdInputModule, MdButtonModule, MdProgressSpinnerModule, HttpModule, JsonpModule, routing],
    declarations: [SoRegister],
    providers: [
        AuthHttp,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('token')),
            globalHeaders: [{ 'Content-Type': 'application/x-www-form-urlencoded' }],
            noJwtError: true
        })]
})

export class RegisterModule {
}