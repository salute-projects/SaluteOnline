import { Component, ViewEncapsulation } from "@angular/core";
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
        canClearRoles: boolean;
        ugadaykaEnabled: boolean;
        rolesValid: boolean;
        nicksValid: boolean;
    }

    protocol : {
        winner: Teams; 
        game: number | null;
        table: number | null;
        killedAtDay: number[];
        killedAtNight: number[];
        bestWay: number[];
        donCheck: number | null;
        sheriffCheck: number | null;
        threeCheck: number | null;
        techRed: boolean;
        techBlack: boolean;
        ugadayka: number[];
        falseSheriff: number | null;
    }

    constructor() {
        this.setInitialState();
        this.players = new Array<PlayerEntry>();
        for (let i = 0; i < 10; i++) {
            const player = new PlayerEntry();
            player.index = i + 1;
            this.players.push(player);
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
            canFillRedRoles: false,
            canClearRoles: false,
            ugadaykaEnabled: false,
            rolesValid: false,
            nicksValid: false
    }

        this.protocol = {
            winner: Teams.None,
            game: null,
            table: null,
            killedAtDay: [],
            killedAtNight: [],
            bestWay: [],
            donCheck: null,
            sheriffCheck: null,
            threeCheck: null,
            techRed: false,
            techBlack: false,
            ugadayka: [],
            falseSheriff: null
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
        this.checkGameEnd();
    }

    miskill(): void {
        this.serviceProps.miskills++;
        this.checkGameEnd();
    }

    roleSelected(): void {
        this.isRolesValid();
        this.serviceProps.canClearRoles = this.players.filter(t => t.role !== null).length !== 10;
        this.processRole(Roles.Шериф, Roles[1], 1);
        this.processRole(Roles.Дон, Roles[2], 1);
        this.processRole(Roles.Мафія, Roles[3], 2);
        this.processRole(Roles.Мирний, Roles[4], 6);
        const notReds = this.players.filter(t => t.role !== null && (t.role.role === Roles.Мафія || t.role.role === Roles.Дон || t.role.role === Roles.Шериф));
        if (notReds.length >= 4) {
            this.serviceProps.canFillRedRoles = true;
        }
    }

    private isRolesValid(): void {
        if (this.players.filter(t => t.role === null).length > 0) {
            this.serviceProps.rolesValid = false;
            return;
        } else {
            const reds = this.players.filter(t => t.role.role === Roles.Мирний).length;
            const blacks = this.players.filter(t => t.role.role === Roles.Мафія).length;
            const sheriffs = this.players.filter(t => t.role.role === Roles.Шериф).length;
            const dons = this.players.filter(t => t.role.role === Roles.Дон).length;
            this.serviceProps.rolesValid = reds === 6 && blacks === 2 && sheriffs === 1 && dons === 1;
        }
    }

    isNicksValid(): boolean {
        return this.players.filter(t => t.nick === '').length === 0;
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
        this.isRolesValid();
    }

    clearRoles(): void {
        this.players.forEach((player: PlayerEntry) => {
            player.role = null;
            player.rolesAvailable = this.defaultRolesAvailable.map(x => Object.assign({}, x));
        });
        this.serviceProps.canFillRedRoles = false;
        this.serviceProps.canClearRoles = false;
    }

    getBackgroundColor(role: Role): string {
        if (!this.serviceProps.night || role == null)
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

    clearNicks(): void {
        this.players.forEach((player: PlayerEntry) => {
            player.nick = "";
        });
    }

    evaluate(): void {
        const ended = this.checkGameEnd();
        if (ended) {
            this.setResult();
            this.bestWayCount();
            this.donCheck();
            this.threeZvCheck();
            this.technicalCheck();
            this.checkUgadayka();
            this.checkFirstKill();
            this.checkBestPlayers();
            this.checkFalseCom();
            this.foulCheck();
        }
    }

    private checkGameEnd(): boolean {
        if (this.serviceProps.miskills === 3) {
            this.protocol.winner = Teams.Red;
            return true;
        } else {
            const aliveRed = this.players.filter(t => !t.killedAtDay && !t.killedAtNight && (t.role.role === Roles.Мирний || t.role.role === Roles.Шериф));
            const aliveBlack = this.players.filter(t => !t.killedAtDay && !t.killedAtNight && (t.role.role === Roles.Мафія || t.role.role === Roles.Дон));
            if (aliveRed.length === aliveBlack.length) {
                this.protocol.winner = Teams.Black;
                if (aliveBlack.length === 3) {
                    this.protocol.techBlack = true;
                }
                return true;
            }
            if (aliveBlack.length === 0) {
                this.protocol.winner = Teams.Red;
                if (!this.players.some(t => (t.role.role === Roles.Мирний || t.role.role === Roles.Шериф) && t.killedAtDay)) {
                    this.protocol.techRed = true;
                }
                return true;
            }
        }
        return false;
    }

    private setResult() {
        if (parseInt(this.protocol.winner.toString()) === Teams.Red) {
            this.players.forEach((player: PlayerEntry) => {
                switch (player.role.role) {
                    case Roles.Дон:
                        player.result = -1;
                        break;
                    case Roles.Мафія:
                        player.result = 0;
                        break;
                    case Roles.Мирний:
                        player.result = 4;
                        break;
                    case Roles.Шериф:
                        player.result = 5;
                        break;
                    default:
                        player.result = null;
                        break;
                }
            });
        } else if (parseInt(this.protocol.winner.toString()) === Teams.Black) {
            this.players.forEach((player: PlayerEntry) => {
                switch (player.role.role) {
                    case Roles.Дон:
                        player.result = 5;
                        break;
                    case Roles.Мафія:
                        player.result = 4;
                        break;
                    case Roles.Мирний:
                        player.result = 0;
                        break;
                    case Roles.Шериф:
                        player.result = -1;
                        break;
                    default:
                        player.result = null;
                        break;
                }
            });
        }
    }

    private bestWayCount() {
        if (this.protocol.bestWay.length !== 3 || !this.protocol.bestWay[0] || !this.protocol.bestWay[1] || !this.protocol.bestWay[2])
            return;
        const firstKilled = this.players.find(t => t.positionInKillQueue === 1);
        if (!firstKilled)
            return;
        const chosenPlayers: PlayerEntry[] = [];
        this.players.forEach((value: PlayerEntry) => {
            if (this.protocol.bestWay.includes(value.index) && (value.role.role === Roles.Дон || value.role.role === Roles.Мафія ))
                chosenPlayers.push(value);
        });
        if (chosenPlayers.length === 2) {
            firstKilled.result += 0.5;
            firstKilled.halfBestWay = true;
        } else if (chosenPlayers.length === 3) {
            firstKilled.result++;
            firstKilled.fullBestWay = true;
        }
    }

    private donCheck() {
        if (!this.protocol.donCheck)
            return;
        const don = this.players.find(t => { return t.role.role === Roles.Дон });
        const target = this.players.find(t => { return t.index === this.protocol.donCheck });
        if (!target || !don)
            return;
        if (target.role.role === Roles.Шериф)
            don.result += 0.5;
    }

    private threeZvCheck() {
        if (!this.protocol.threeCheck)
            return;
        const sheriff = this.players.find(t => { return t.role.role === Roles.Шериф });
        if (!sheriff)
            return;
        sheriff.result++;
    }

    private technicalCheck() {
        if (!this.protocol.techRed && !this.protocol.techBlack)
            return;
        if (this.protocol.techBlack) {
            this.players.forEach((player: PlayerEntry) => {
                if (player.role.role === Roles.Дон || player.role.role === Roles.Мафія)
                    player.result++;
            });
        } else if (this.protocol.techRed) {
            this.players.forEach((player: PlayerEntry) => {
                if (player.role.role === Roles.Мирний || player.role.role === Roles.Шериф)
                    player.result++;
            });
        }
    }

    private checkUgadayka() {
        if (!this.serviceProps.ugadaykaEnabled || this.protocol.ugadayka.length !== 3)
            return;
        if (parseInt(this.protocol.winner.toString()) === Teams.Black) {
            this.players.forEach((player: PlayerEntry) => {
                if (this.protocol.ugadayka.includes(player.index) && (player.role.role === Roles.Дон || player.role.role === Roles.Мафія)) {
                    player.result++;
                }
            });
        } else if (parseInt(this.protocol.winner.toString()) === Teams.Red) {
            this.players.forEach((player: PlayerEntry) => {
                if (this.protocol.ugadayka.includes(player.index) && (player.role.role === Roles.Мирний || player.role.role === Roles.Шериф)) {
                    player.result++;
                }
            });
        }
    }

    private checkFirstKill() {
        if (!this.protocol.killedAtNight[0])
            return;
        const don = this.players.find(t => { return t.role.role === Roles.Дон });
        const sheriff = this.players.find((player: PlayerEntry) => { return player.role.role === Roles.Шериф });
        if (!don || !sheriff)
            return;
        if (parseInt(this.protocol.winner.toString()) === Teams.Black &&
            this.protocol.killedAtNight[0] === sheriff.index) {
            don.result++;
        } else if (parseInt(this.protocol.winner.toString()) === Teams.Red && this.protocol.killedAtNight[0] === sheriff.index) {
            sheriff.result++;
        }
    }

    private checkBestPlayers() {
        const firstBest = this.players.find(t => { return t.bestPlayer.value === BestPlayers.Best1; });
        const secondBest = this.players.find(t => { return t.bestPlayer.value === BestPlayers.Best2; });
        const thirdBest = this.players.find(t => { return t.bestPlayer.value === BestPlayers.Best3; });
        if (firstBest) {
            firstBest.result++;
        }
        if (secondBest) {
            secondBest.result += 0.5;
        }
        if (thirdBest) {
            thirdBest.result += 0.5;
        }
    }

    private checkFalseCom() {
        if (!this.protocol.falseSheriff || parseInt(this.protocol.winner.toString()) !== Teams.Black)
            return;
        const falseCom = this.players.find(t => { return t.index === this.protocol.falseSheriff; });
        if (!falseCom)
            return;
        falseCom.result++;
    }

    private foulCheck() {
        this.players.forEach((player: PlayerEntry) => {
            if (player.foul === 4)
                player.result -= 1;
        });
    }


}