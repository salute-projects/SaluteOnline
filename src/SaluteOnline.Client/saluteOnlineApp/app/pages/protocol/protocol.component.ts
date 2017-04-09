﻿import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { IPlayerEntry, PlayerEntry, Roles, Role, Teams, BestPlayers } from "../../domain/ProtocolEnums";

@Component({
    selector: 'so-protocol',
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styles: [require('./protocol.component.scss').toString()],
    template: require('./protocol.component.html')
})

export class SoProtocol {

    defaultRolesAvailable: Role[];

    players: PlayerEntry[];

    searchNick(event: any) {
    }

    serviceProps : {
        night: boolean;
        onVote: number[];
        notOnVote: number[];
        killQueue: number;
        miskills: number;
        canFillRedRoles: boolean;
    }

    protocol : {
        winner: Teams; 
        game: number | null;
        table: number | null;
        killedAtDay: number[];
        killedAtNight: number[];
    }

    constructor() {
        this.setInitialState();
        this.players = new Array<PlayerEntry>();
        for (let i = 0; i < 10; i++) {
            this.players.push(new PlayerEntry());
        }
        this.defaultRolesAvailable = [new Role(Roles.Шериф, Roles[1]), new Role(Roles.Дон, Roles[2]), new Role(Roles.Мафія, Roles[3]), new Role(Roles.Мирний, Roles[4])
        ];
    }

    private setInitialState(): void {
        this.serviceProps = {
            night: false,
            notOnVote: Array.apply(null, { length: 10 }).map((value: any, index: number) => index + 1),
            onVote: [],
            killQueue: 1,
            miskills: 0,
            canFillRedRoles: false
        }

        this.protocol = {
            winner: Teams.None,
            game: null,
            table: null,
            killedAtDay: [],
            killedAtNight: []
        }
    }

    addToVote(player: number) : void {
        this.serviceProps.onVote.push(player);
        this.serviceProps.notOnVote = this.serviceProps.notOnVote.filter(t => t !== player).sort((n1, n2) => n1 - n2);
    }

    removeFromVote(player: number): void {
        this.serviceProps.onVote = this.serviceProps.onVote.filter(t => t !== player);
        this.serviceProps.notOnVote.push(player);
        this.serviceProps.notOnVote.sort((n1, n2) => n1 - n2);
    }

    clearVoting(): void {
        this.serviceProps.notOnVote = Array.apply(null, { length: 10 }).map((value: any, index: number) => index + 1);
        this.serviceProps.onVote = [];
    }

    foulsChange(player: PlayerEntry): void {
        if (player.foul === 0) {
            player.foul = null;
        }
    }

    zeroToNull(object: any, property: string) : void {
        if (typeof object[property] === "undefined")
            return;
        if (object[property] === 0)
            object[property] = null;
    }

    kill(player: PlayerEntry, index: number): void {
        if (this.serviceProps.night) {
            this.protocol.killedAtNight.push(index);
            player.killedAtNight = true;
        } else {
            this.protocol.killedAtDay.push(index);
            player.killedAtDay = true;
        }
        player.positionInKillQueue = this.serviceProps.killQueue;
        this.serviceProps.killQueue++;
        this.evaluate();
    }

    miskill(): void {
        this.serviceProps.miskills++;
        this.evaluate();
    }

    evaluate(): void {
        if (this.serviceProps.miskills === 3) {
            this.protocol.winner = Teams.Red;
        } else {
            const aliveRed = this.players.filter(t => !t.killedAtDay && !t.killedAtNight && (t.role.role === Roles.Мирний || t.role.role === Roles.Шериф));
            const aliveBlack = this.players.filter(t => !t.killedAtDay && !t.killedAtNight && (t.role.role === Roles.Мафія || t.role.role === Roles.Дон));
            if (aliveRed.length === aliveBlack.length) {
                this.protocol.winner = Teams.Black;
                return;
            }
            if (aliveBlack.length === 0) {
                this.protocol.winner = Teams.Red;
                return;
            }
        }
    }

    roleSelected(): void {
        this.processRole(Roles.Шериф, Roles[1], 1);
        this.processRole(Roles.Дон, Roles[2], 1);
        this.processRole(Roles.Мафія, Roles[3], 2);
        this.processRole(Roles.Мирний, Roles[4], 6);
        const notReds = this.players.filter(t => t.role !== null && (t.role.role === Roles.Мафія || t.role.role === Roles.Дон || t.role.role === Roles.Шериф));
        if (notReds.length >= 4) {
            this.serviceProps.canFillRedRoles = true;
        }
    }

    private processRole(role: Roles, label: string, allowedCount: number): void {
        if (this.players.filter(t => t.role !== null && t.role.role === role).length === allowedCount) {
            this.players.forEach((player: PlayerEntry) => {
                if (player.role === null || player.role.role !== role)
                    player.rolesAvailable = player.rolesAvailable.filter(t => t.role !== role);
            });
        } else {
            this.players.forEach((player: PlayerEntry) => {
                if (!player.rolesAvailable.some(t => t
                    .role === role)) player.rolesAvailable.push(new Role(role, label));
                player.rolesAvailable.sort((role1, role2) => role1.role - role2.role);
            });
        }
    }

    fillRedRoles(): void {
        this.players.forEach((player: PlayerEntry) => { if (player.role === null) player.role = player.rolesAvailable.find(t => t.role === Roles.Мирний) });
    }

    clearRoles(): void {
        this.players.forEach((player: PlayerEntry) => {
            player.role = null;
            player.rolesAvailable = this.defaultRolesAvailable.map(x => Object.assign({}, x));
        });
        this.serviceProps.canFillRedRoles = false;
    }

    getBackgroundColor(role: Role): string {
        if (role == null)
            return "transparent";
        switch (role.role) {
        case Roles.Дон:
            return "#292929";
        case Roles.Шериф:
            return "#D32F2F";
        case Roles.Мафія:
            return "#535353";
        case Roles.Мирний:
            return "#d74444";
        default:
            return "transparent";
        }
    }

    getSelectColor(role: Role): boolean {
        return role != null;
    }
}