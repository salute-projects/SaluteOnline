export interface IPlayerEntry {
    nick: string;
    role?: string;
    foul: number;
    bestPlayer: string;
    result: number;
    positionInKillQueue?: number;
    killedAtDay?: boolean;
    killedAtNight?: boolean;
    checkedAtNight?: number;
    rolesAvailable: string[];
    bestPlayersAvailable: string[];
}

export class PlayerEntry implements IPlayerEntry {
    constructor(player: IPlayerEntry = {
        nick: '',
        role: null,
        foul: 0,
        bestPlayer: '',
        result: 0,
        positionInKillQueue: null,
        killedAtDay: null,
        killedAtNight: null,
        checkedAtNight: null,
        rolesAvailable: ['Мирний', 'Чорний', 'Шериф', 'Дон'],
        bestPlayersAvailable: ['Кращий 1', 'Кращий 2', 'Кращий 3']
    }) {
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
    }

    nick: string;
    role: string;
    foul: number;
    bestPlayer: string;
    result: number;
    positionInKillQueue: number;
    killedAtDay: boolean;
    killedAtNight: boolean;
    checkedAtNight: number;
    rolesAvailable: string[];
    bestPlayersAvailable: string[];
}