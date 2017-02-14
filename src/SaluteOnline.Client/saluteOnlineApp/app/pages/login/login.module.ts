import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdInputModule, MdButtonModule } from "@angular/material";

import { SoLogin } from "./login.component";
import { routing } from "./login.routing";

import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MdInputModule, MdButtonModule, routing],
    declarations: [SoLogin],
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

export class LoginModule {
}