import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class GlobalState {
    private _data = new Subject<Object>();
    private _dataStream = this._data.asObservable();
    private _subscriptions = new Map<string, Array<Function>>();

    constructor() {
        this._dataStream.subscribe((data: any) => { this.onEvent(data) });
    }
    
    loggedIn() {
        return tokenNotExpired('token');
    }

    notifyDataChanged(event: string, value: any) {
        const current = this._data[event];
        if (current !== value) {
            this._data[event] = value;
            this._data.next({
                event: event,
                data: this._data[event]
            });
        }
    }

    subscribe(event: string, callback: Function) {
        const subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);
        this._subscriptions.set(event, subscribers);
    }

    onEvent(data: any) {
        const subscribers = this._subscriptions.get(data['event']) || [];
        subscribers.forEach((callback) => {
            callback.call(null, data['data']);
        });
    }
}