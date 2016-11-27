import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class GlobalState {
    private data = new Subject<Object>();
    private dataStream = this.data.asObservable();

    private subscriptions = new Map<string, Array<Function>>();

    constructor() {
        this.dataStream.subscribe((data: any) => { this.onEvent(data) });
    }
    
    notifyDataChanged(event: string, value: any) {
        const current = this.data[event];
        if (current !== value) {
            this.data[event] = value;
            this.data.next({
                event: event,
                data: this.data[event]
            });
        }
    }

    subscribe(event: string, callback: Function) {
        const subscribers = this.subscriptions.get(event) || [];
        subscribers.push(callback);
        this.subscriptions.set(event, subscribers);
    }

    onEvent(data: any) {
        const subscribers = this.subscriptions.get(data['event']) || [];
        subscribers.forEach((callback) => {
            callback.call(null, data['data']);
        });
    }
}