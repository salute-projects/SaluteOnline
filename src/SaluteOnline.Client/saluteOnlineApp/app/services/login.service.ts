import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { AuthHttp } from 'angular2-jwt';
import { UrlsService } from "./urls";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {
    
    thing: {};

    constructor(public http: Http, public authHttp: AuthHttp, private _urlsService: UrlsService, private _router: Router) {
        
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
                    this._router.navigate(['pages']);
                },
                err => console.log(err),
                () => console.log('empty')
            );
    }
}