import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";

@Injectable()
export class LoginService {
    
    constructor(public http: Http) {
        
    }

    login(username: string, password: string): void {
        const params = new URLSearchParams();
        params.set('username', username);
        params.set('password', password);
        params.set('grant_type', 'password');
        params.set('client_id', 'salute_web_client');
        params.set('client_secret', '4295960dae5e9e6aab6fe53f7b720f79358274cf83a0f0041386a0f9983dc8f5');
        params.set('scope', 'offline_access');     
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });

        this.http.post('http://localhost:9657/connect/token', params.toString(), options)
            .map(res => res.json())
            .subscribe(
                (data: any) => localStorage.setItem("Token", data.access_token),
                err => console.log(err),
                () => console.log('empty')
            );
    }
}