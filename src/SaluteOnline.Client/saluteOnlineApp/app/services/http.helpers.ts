import { Injectable } from "@angular/core";
import { StringsKeyValue } from "../domain/DataStructures";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";

@Injectable()
export class HttpHelpers {

    createFormEncodedRequest(params: StringsKeyValue[]) {
        const requestParams = new URLSearchParams();
        params.forEach((item) => {
            requestParams.set(item.key, item.value);
        });
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
        return { params: requestParams, options: options };
    }

    createJsonRequest() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    }
}