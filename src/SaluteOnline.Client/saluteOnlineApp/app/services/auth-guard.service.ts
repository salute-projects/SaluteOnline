import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router) {}

    canActivate(route: Object, state: Object): boolean {
        if (tokenNotExpired('token')) {
            return true;
        } else {
            this._router.navigate(['login']);
            return false;
        }
    }

    logged(): boolean {
        return tokenNotExpired('token');
    }
}