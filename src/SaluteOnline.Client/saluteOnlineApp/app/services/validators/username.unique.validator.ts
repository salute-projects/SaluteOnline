import { AbstractControl } from "@angular/forms";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { UrlsService } from "../urls";

export class UsernameUniqueValidator  {
    
    constructor(private _http: Http, private _urls: UrlsService) {
        
    }

    validate(c: AbstractControl) {
        return new Promise(resolve => {
            const params = new URLSearchParams();
                params.set('username', c.value);
                return this._http.get(this._urls.checkUsernameUniquity, { search: params })
                    .map(res => res.json())
                    .subscribe(
                        (data: boolean) => {
                            return data
                                ? resolve({
                                    usernameUnique: {
                                        valid: false
                                    }
                                }) : resolve(null);
                        },
                        () => {
                            return resolve({
                                usernameUnique: {
                                    valid: false
                                }
                            });
                        });
        });
    }
}