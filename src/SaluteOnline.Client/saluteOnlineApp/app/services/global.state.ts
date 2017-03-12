import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { tokenNotExpired } from 'angular2-jwt';
import { IUser } from "../domain/IUser";

@Injectable()
export class GlobalState {
    private _data = new Subject<Object>();
    private _dataStream = this._data.asObservable();
    private _subscriptions = new Map<string, Array<Function>>();
    private _currentUser: BehaviorSubject<IUser>;

    constructor() {
        this._dataStream.subscribe((data: any) => { this.onEvent(data) });
        this._currentUser = new BehaviorSubject<IUser>(null);
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

    get getUser() {
        return this._currentUser.asObservable();
    }

    setUser(user: any) {
        this._currentUser.next(user);
    }
}