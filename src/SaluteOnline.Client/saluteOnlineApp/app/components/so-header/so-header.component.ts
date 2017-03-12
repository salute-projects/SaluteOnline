import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { GlobalState } from "../../services/global.state";
import { LoginService } from "../../services/login.service";
import { IUser } from "../../domain/IUser";

@Component({
    selector: 'so-header',
    styles: [ require('./so-header.component.scss').toString() ],
    template: require('./so-header.component.html'),
    encapsulation: ViewEncapsulation.None
})
export class SoHeader implements OnInit {
    isMenuCollapsed = false;
    userLogged = this.state.loggedIn();
    user : IUser;    

    constructor(public state: GlobalState, private _loginService: LoginService) {
        this.state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    logout() {
        this._loginService.logout();
        this.userLogged = this.state.loggedIn();
    }

    getUsername() {
        return localStorage.getItem('username');
    }

    ngOnInit(): void {
        this.state.getUser.subscribe(o => this.user = o);
    }
}