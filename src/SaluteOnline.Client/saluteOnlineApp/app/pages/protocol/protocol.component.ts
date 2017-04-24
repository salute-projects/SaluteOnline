import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { SoDialogService } from "../../services/dialog/dialog.service";
import { DialogProperties, IDialogProperties } from "../../services/dialog/IDialogProperties";
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { UrlsService } from "../../services/urls";
import { Headers, RequestOptions, RequestMethod, Request } from "@angular/http";
import { IPlayerEntry, IProtocol, Protocol, PlayerEntry, Roles, Role, Teams, BestPlayers } from "../../domain/ProtocolEnums";

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
    searchNick(event: any) {}

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
        checkVisibility: boolean;
        checkSuccess: boolean | null;
        checkTypeIsDon: boolean | null;
        currentCheckIndex: number | null;
    }

    timerProps: {
        timerVisible: boolean;
        timerSpeaker: boolean;
        halfTime: boolean;
        tick: number;
        timerSubscription: Subscription;
        timerDisplay: string;
        active: boolean;
        startTick: number;
    }

    protocol : IProtocol;

    constructor(private readonly dialogService: SoDialogService, private readonly authHttp: AuthHttp, private readonly urlsService: UrlsService) {
        this.setInitialState();
    }

    save() {       
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this.urlsService.addProtocol,
            headers: headers,
            body: JSON.stringify(this.protocol)
        });

        this.authHttp.request(new Request(requestOptions))
            .map(res => res.json())
            .subscribe((result: any) => {
                    var x = result;
                },
            () => {
                var x = 'fail';
            });   
    }


    private prepareData() {
        
    }

    clear() {
        const config = new DialogProperties({
            header: 'очистити',
            okButton: 'OK',
            cancelButton: 'CANCEL',
            content: 'Очистити протокол?',
            customClass: ''
        });
        this.dialogService.show(config, null, null, true).then((result: boolean) => {
            if (result) {
                this.setInitialState();
            }
        });
    }

    private setInitialState(): void {
        this.players = new Array<PlayerEntry>();
        for (let i = 0; i < 10; i++) {
            const player = new PlayerEntry();
            player.index = i + 1;
            this.players.push(player);
        }
        this.defaultRolesAvailable = [new Role(Roles.Шериф, Roles[1]), new Role(Roles.Дон, Roles[2]), new Role(Roles.Мафія, Roles[3]), new Role(Roles.Мирний, Roles[4])
        ];

        this.serviceProps = {
            night: true,
            notOnVote: Array.apply(null, { length: 10 }).map((value: any, index: number) => index + 1),
            onVote: [],
            killQueue: 1,
            miskills: 0,
            canFillRedRoles: false,
            canClearRoles: false,
            ugadaykaEnabled: false,
            rolesValid: false,
            nicksValid: false,
            checkVisibility: false,
            checkSuccess: null,
            checkTypeIsDon: null,
            currentCheckIndex: null
        }

        this.timerProps = {
            timerVisible: false,
            timerSpeaker: false,
            halfTime: false,
            tick: 0,
            timerSubscription: null,
            timerDisplay: '00',
            active: false,
            startTick: 0
        }
        this.protocol = new Protocol;
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
        else if (player.foul === 4) {
            const config = new DialogProperties({
                header: 'дискваліфікація',
                okButton: 'OK',
                cancelButton: 'CANCEL',
                content: 'Дискваліфікувати гравця?',
                customClass: 'testclass'
            });
            this.dialogService.show(config, null, null, true).then((result: boolean) => {
                if (!result) {
                    player.foul = 3;
                }
            });
        }
    }

    zeroToNull(object: any, property: string) : void {
        if (typeof object[property] === "undefined")
            return;
        if (object[property] === 0)
            object[property] = null;
    }

    uniqueNumbers(object: number[], index: number): void {
        if (object[index] === 0) {
            object[index] = null;
            return;
        }
        const other: number[] = [];
        object.forEach((value, ind) => {
            if (ind !== index)
                other.push(value);
        });
        if (other.includes(object[index])) {
            if (object[index] < 10) {
                object[index]++;
            } else {
                object[index] = null;
            }
        }
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
        this.processUgadayka();
        this.processFirstKill();
        this.autoEvaluate();
    }

    miskill(): void {
        this.serviceProps.miskills++;
        this.autoEvaluate();
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

    private processUgadayka(): void {
        const alive = this.players.filter(t => !t.killedAtDay && !t.killedAtNight);
        if (alive.length === 3) {
            this.protocol.ugadayka = alive.map(t => t.index);
            this.serviceProps.ugadaykaEnabled = true;
        }
    }

    private processFirstKill(): void {
        if (!this.protocol.killedAtNight[0])
            return;
        if (this.players.find(t => t.index === this.protocol.killedAtNight[0]).role.role === Roles.Шериф) {
            this.protocol.sheriffFirstKilled = true;
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
        this.players.forEach((player: PlayerEntry) => { player.nick = ""; });
    }

    autoEvaluate(): void {
        const ended = this.checkGameEnd();
        if (ended) {
            this.countResults();
        }
    }

    evaluate(): void {
        this.countResults();
    }

    private countResults(): void {
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
        this.serviceProps.night = true;
    }

    private checkGameEnd(): boolean {
        if (this.serviceProps.miskills === 3) {
            this.protocol.winner = Teams.Red;
            return true;
        } else {
            const aliveRed = this.players.filter(t => !t.killedAtDay && !t.killedAtNight && this.isRed(t));
            const aliveBlack = this.players.filter(t => !t.killedAtDay && !t.killedAtNight && this.isBlack(t));
            if (aliveRed.length === aliveBlack.length) {
                this.protocol.winner = Teams.Black;
                if (aliveBlack.length === 3) {
                    this.protocol.techBlack = true;
                }
                return true;
            }
            if (aliveBlack.length === 0) {
                this.protocol.winner = Teams.Red;
                if (!this.players.some(t => this.isRed(t) && t.killedAtDay)) {
                    this.protocol.techRed = true;
                }
                return true;
            }
        }
        return false;
    }

    private setResult() {
        if (this.redWins()) {
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
        } else if (this.blackWins()) {
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
            if (this.protocol.bestWay.includes(value.index) && this.isBlack(value))
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
                if (this.isBlack(player))
                    player.result++;
            });
        } else if (this.protocol.techRed) {
            this.players.forEach((player: PlayerEntry) => {
                if (this.isRed(player))
                    player.result++;
            });
        }
    }

    private checkUgadayka() {
        if (!this.serviceProps.ugadaykaEnabled || this.protocol.ugadayka.length !== 3)
            return;
        if (parseInt(this.protocol.winner.toString()) === Teams.Black) {
            this.players.forEach((player: PlayerEntry) => {
                if (this.protocol.ugadayka.includes(player.index) && this.isBlack(player)) {
                    player.result++;
                }
            });
        } else if (parseInt(this.protocol.winner.toString()) === Teams.Red) {
            this.players.forEach((player: PlayerEntry) => {
                if (this.protocol.ugadayka.includes(player.index) && this.isRed(player)) {
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
        }
        if (this.protocol.sheriffFirstKilled && this.blackWins()) {
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
        if (!this.protocol.falseSheriff || this.blackWins())
            return;
        const falseCom = this.players.find(t => { return t.index === this.protocol.falseSheriff; });
        if (!falseCom)
            return;
        falseCom.result++;
    }

    private foulCheck() {
        this.players.forEach((player: PlayerEntry) => {
            if (player.foul === 4)
                player.result = -1;
        });
    }

    winnerChanged(): void {
        this.protocol.techRed = false;
        this.protocol.techBlack = false;
        this.players.forEach(t => t.result = null);
        this.checkEnabledBestPlayers();
    }

    private checkEnabledBestPlayers(): void {
        if (this.blackWins()) {
            this.players.forEach(t => {
                if (this.isBlack(t)) {
                    t.bestPlayersAvailable.forEach(z => {
                        if (z.value === BestPlayers.Best3)
                            z.enabled = false;
                    });
                }
                if (this.isRed(t)) {
                    t.bestPlayersAvailable.forEach(z => {
                        if (z.value === BestPlayers.Best1 || z.value === BestPlayers.Best2) {
                            z.enabled = false;
                        }
                    });
                }
            });
        } else if (this.redWins()) {
            this.players.forEach(t => {
                if (this.isBlack(t)) {
                    t.bestPlayersAvailable.forEach(z => {
                        if (z.value === BestPlayers.Best1 || z.value === BestPlayers.Best2)
                            z.enabled = false;
                    });
                }
                if (this.isRed(t)) {
                    t.bestPlayersAvailable.forEach(z => {
                        if (z.value === BestPlayers.Best3) {
                            z.enabled = false;
                        }
                    });
                }
            });
        }
    }

    bestPlayerSelected(player: PlayerEntry) {
       if (player.bestPlayer.value !== BestPlayers.None) {
           this.players.forEach(t => {
               if (t.index !== player.index)
                   t.bestPlayersAvailable.find(z => z.value === player.bestPlayer.value).enabled = false;
           });
       } else {
           const currentlySelected = this.players.map(t => t.bestPlayer.value);
           this.players.forEach(t => {
               t.bestPlayersAvailable.forEach(z => {
                   if (!currentlySelected.includes(z.value)) {
                       z.enabled = true;
                   }
               });
           });
       }
    }

    private isBlack(player: PlayerEntry): boolean {
        return player.role && (player.role.role === Roles.Дон || player.role.role === Roles.Мафія);
    }

    private isRed(player: PlayerEntry): boolean {
        return player.role && (player.role.role === Roles.Мирний || player.role.role === Roles.Шериф);
    }

    private redWins(): boolean {
        return parseInt(this.protocol.winner.toString()) === Teams.Red;
    }

    private blackWins(): boolean {
        return parseInt(this.protocol.winner.toString()) === Teams.Black;
    }

    showCheck(donCheck: boolean) {
        this.serviceProps.checkTypeIsDon = donCheck;
        this.serviceProps.checkVisibility = true;
    }

    check(index: number) {
        this.serviceProps.currentCheckIndex = index;
        if (this.serviceProps.checkTypeIsDon) {
            this.serviceProps.checkSuccess = this.players.find(t => t.index === index).role.role === Roles.Шериф;
        } else {
            this.serviceProps.checkSuccess = this.isBlack(this.players.find(t => t.index === index));
        }
    }

    closeCheck() {
        this.serviceProps.checkSuccess = null;
        this.serviceProps.checkVisibility = false;
        if (this.serviceProps.checkTypeIsDon && !this.protocol.donCheck) {
            this.protocol.donCheck = this.serviceProps.currentCheckIndex;
        } else if (!this.serviceProps.checkTypeIsDon && !this.protocol.sheriffCheck) {
            this.protocol.sheriffCheck = this.serviceProps.currentCheckIndex;
        }
        this.serviceProps.currentCheckIndex = null;
    }

    checkDisabled(): boolean {
        return this.players.some(t => t.role === null);
    }

    startTimer() {
        if (!this.timerProps.active) {
            this.timerProps.active = true;
            const timer = TimerObservable.create(0, 1000);
            this.timerProps.timerSubscription = timer.takeWhile(() => this.timerProps.tick < (this.timerProps.halfTime ? 30 : 60))
                .subscribe(t => {
                    const currentWithGap = (t as number) + this.timerProps.startTick;
                    this.timerProps.tick = currentWithGap;
                    this.timerProps.timerDisplay = currentWithGap < 10 ? `0${currentWithGap}` : (currentWithGap).toString();
                });
        } else {
            this.timerProps.timerSubscription.unsubscribe();
            this.timerProps.timerSubscription = null;
            this.timerProps.startTick = this.timerProps.tick;
            this.timerProps.tick = 0;
            this.timerProps.active = false;
        }
    }

    clearTimer() {
        this.timerProps.active = false;
        this.timerProps.startTick = 0;
        this.timerProps.tick = 0;
        this.timerProps.timerDisplay = "00";
        if (this.timerProps.timerSubscription) {
            this.timerProps.timerSubscription.unsubscribe();   
        }
    }

    getTimerColor() {
        return (this.timerProps.halfTime ? 30 : 60) - this.timerProps.tick <= 10 ? '#009eeb' : '#292929';
    }
}