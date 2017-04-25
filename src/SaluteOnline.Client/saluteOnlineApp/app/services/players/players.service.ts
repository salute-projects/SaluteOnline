import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { UrlsService } from "../urls";
import { Observable } from "rxjs";


@Injectable()
export class PlayersService {

    constructor(private readonly http: Http, private readonly urls: UrlsService) {
    }

    getAllNicknames() {
        return this.http.get(this.urls.getNicknames)
            .map(res => res.json());
    }
}