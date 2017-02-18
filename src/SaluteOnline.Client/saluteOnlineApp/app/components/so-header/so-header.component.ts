import { Component, ViewEncapsulation } from "@angular/core";
import { GlobalState } from "../../services/global.state";
import { LoginService } from "../../services/login.service";

@Component({
    selector: 'so-header',
    styles: [ require('./so-header.component.scss').toString() ],
    template: require('./so-header.component.html'),
    encapsulation: ViewEncapsulation.None
})
export class SoHeader {
    isMenuCollapsed = false;
    userLogged = this._state.loggedIn();
    
    constructor(private _state: GlobalState, private _loginService: LoginService) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    logout() {
        this._loginService.logout();
        this.userLogged = this._state.loggedIn();
    }

    getUsername() {
        return localStorage.getItem('username');
    }
}