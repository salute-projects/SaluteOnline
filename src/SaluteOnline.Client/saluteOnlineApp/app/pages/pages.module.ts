import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./pages.routing";
import { Pages } from "./pages.component";
import { SoHeader } from '../components/so-header/so-header.component';
import { SoSidebar } from "../components/so-sidebar/so-sidebar.component";
import { SoRightSidebar } from "../components/so-right-sidebar/so-right-sidebar.component";
import { SoMenu } from "../components/so-menu/so-menu.component";
import { SoMenuItem } from "../components/so-menuitem/so-menuitem.component";
import { MdMenuModule, MdButtonModule } from '@angular/material';
import { LoginService } from "../services/login.service";
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth, tokenNotExpired } from 'angular2-jwt';
import { UrlsService } from "../services/urls";
import { AuthGuard } from "../services/auth-guard.service";

@NgModule({
    imports: [CommonModule, MdMenuModule, MdButtonModule, routing],
    providers: [LoginService, AuthHttp, UrlsService, AuthGuard,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('token')),
            globalHeaders: [{ 'Content-Type': 'application/x-www-form-urlencoded' }],
            noJwtError: true
        })],
    declarations: [Pages, SoHeader, SoSidebar, SoRightSidebar, SoMenu, SoMenuItem]

})

export class PagesModule {
    
}