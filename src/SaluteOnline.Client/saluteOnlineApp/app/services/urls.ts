﻿import { Injectable } from "@angular/core";

@Injectable()
export class UrlsService {

    identityServerUrl = 'http://localhost:9657/';
    apiUrl = 'http://localhost:43713/api/';

    loginEndpoint = this.identityServerUrl + 'connect/token';
    revokeEndpoint = this.identityServerUrl + 'connect/revocation';

    checkEmailUniquity = this.identityServerUrl + 'api/account/EmailUniquity';
    checkUsernameUniquity = this.identityServerUrl + 'api/account/UsernameUniquity';

    getCity = this.apiUrl + 'Geo/GetCity';
}