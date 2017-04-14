export enum Teams {
    None = 0,
    Red = 1,
    Black = 2
}

export enum Roles {
    Шериф = 1,
    Дон = 2,
    Мафія = 3,
    Мирний = 4
}

export enum BestPlayers {
    None = 0,
    Best1 = 1,
    Best2 = 2,
    Best3 = 3
}

export class Role {
    constructor(role: Roles, label: string) {
        this.role = role;
        this.label = label;
    }
    role: Roles;
    label: string;
}

export class BestPlayer {
    constructor(value: BestPlayers, label: string) {
        this.value = value;
        this.label = label;
    }
    value: BestPlayers;
    label: string;
}

export interface IPlayerEntry {
    index: number | null;
    nick: string;
    role?: Role | null;
    foul?: number;
    bestPlayer: BestPlayer;
    result?: number;
    positionInKillQueue?: number;
    killedAtDay?: boolean;
    killedAtNight?: boolean;
    checkedAtNight?: number;
    rolesAvailable: Role[];
    bestPlayersAvailable: BestPlayer[];
    halfBestWay: boolean;
    fullBestWay: boolean;
}

export class PlayerEntry implements IPlayerEntry {
    constructor(player: IPlayerEntry = {
        index: null,
        nick: '',
        role: null,
        foul: null,
        bestPlayer: new BestPlayer(BestPlayers.None, ''),
        result: null,
        positionInKillQueue: null,
        killedAtDay: null,
        killedAtNight: null,
        checkedAtNight: null,
        rolesAvailable: [new Role(Roles.Шериф, Roles[1]), new Role(Roles.Дон, Roles[2]), new Role(Roles.Мафія, Roles[3]), new Role(Roles.Мирний, Roles[4])],
        bestPlayersAvailable: [new BestPlayer(BestPlayers.None, ''), new BestPlayer(BestPlayers.Best1, 'Кращий 1'),
            new BestPlayer(BestPlayers.Best2, 'Кращий 2'), new BestPlayer(BestPlayers.Best3, 'Кращий 3')],
        halfBestWay: false,
        fullBestWay: false
    }) {
        this.index = player.index;
        this.nick = player.nick;
        this.role = player.role;
        this.foul = player.foul;
        this.bestPlayer = player.bestPlayer;
        this.result = player.result;
        this.positionInKillQueue = player.positionInKillQueue;
        this.killedAtDay = player.killedAtDay;
        this.killedAtNight = player.killedAtNight;
        this.checkedAtNight = player.checkedAtNight;
        this.rolesAvailable = player.rolesAvailable;
        this.bestPlayersAvailable = player.bestPlayersAvailable;
        this.halfBestWay = player.halfBestWay;
        this.fullBestWay = player.fullBestWay;
    }

    index: number | null;
    nick: string;
    role: Role;
    foul: number | null;
    bestPlayer: BestPlayer;
    result: number | null;
    positionInKillQueue: number;
    killedAtDay: boolean;
    killedAtNight: boolean;
    checkedAtNight: number;
    rolesAvailable: Role[];
    bestPlayersAvailable: BestPlayer[];
    halfBestWay: boolean;
    fullBestWay: boolean;
}