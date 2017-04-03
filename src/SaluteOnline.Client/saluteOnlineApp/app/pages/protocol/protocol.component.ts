import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { IPlayerEntry, PlayerEntry } from "../../domain/PlayerEntry";

@Component({
    selector: 'so-protocol',
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styles: [require('./protocol.component.scss').toString()],
    template: require('./protocol.component.html')
})

export class SoProtocol {

    players: PlayerEntry[];

    constructor() {
        this.players = new Array<PlayerEntry>();
        for (let i = 0; i < 10; i++) {
            this.players.push(new PlayerEntry());
        }
    }
}