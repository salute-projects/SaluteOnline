import { Injectable, EventEmitter  } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { UrlsService } from "./urls";
import { MdSnackBar } from "@angular/material";
import { IUser } from "../domain/IUser";
import { GlobalState } from "./global.state";

@Injectable()
export class LoginService {
    
    emitter = new EventEmitter<boolean>();

    constructor(public http: Http, private _authHttp: AuthHttp, private _urlsService: UrlsService, public snackBar: MdSnackBar, private _gloabalState: GlobalState) { 
    }
    
    emit(success: boolean) {
        this.emitter.emit(success);
    }

    getEmitter() {
        return this.emitter;
    }

    login(username: string, password: string): void {
        const params = new URLSearchParams();
        params.set('username', username);
        params.set('password', password);
        params.set('grant_type', 'password');
        params.set('client_id', 'salute_web_client');
        params.set('client_secret', '4295960dae5e9e6aab6fe53f7b720f79358274cf83a0f0041386a0f9983dc8f5');
        params.set('scope', 'SaluteOnlineApi offline_access');     
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });

        this.http.post(this._urlsService.loginEndpoint, params.toString(), options)
            .map(res => res.json())
            .subscribe(
                (data: any) => {
                    localStorage.setItem("token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    localStorage.setItem('username', username);
                    this.getUserProfile();
                },
                () => {
                    const snackBar = this.snackBar.open("Не вдалось увійти", "Закрити", { duration: 10000 });
                    snackBar.onAction().subscribe(() => {
                        snackBar.dismiss();
                    });
                    this.emit(false);
                }
            );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('username');
        this.emit(false);
    }

    getUserProfile() {
        this._authHttp.get(this._urlsService.getLoggedUser)
            .map(res => res.json())
            .subscribe(
                (result: IUser) => {
                    this._gloabalState.setUser(result);
                },
                () => {},
                () => {
                    this.emit(true);
                });
    }
}