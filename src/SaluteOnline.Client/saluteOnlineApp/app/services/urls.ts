import { Injectable } from "@angular/core";

@Injectable()
export class UrlsService {
    loginEndpoint = 'http://localhost:9657/connect/token';
    revokeEndpoint = 'http://localhost:9657/connect/revocation';
}