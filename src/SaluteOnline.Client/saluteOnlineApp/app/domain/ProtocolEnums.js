"use strict";
var Teams;
(function (Teams) {
    Teams[Teams["None"] = 0] = "None";
    Teams[Teams["Red"] = 1] = "Red";
    Teams[Teams["Black"] = 2] = "Black";
})(Teams = exports.Teams || (exports.Teams = {}));
var Roles;
(function (Roles) {
    Roles[Roles["\u0428\u0435\u0440\u0438\u0444"] = 1] = "\u0428\u0435\u0440\u0438\u0444";
    Roles[Roles["\u0414\u043E\u043D"] = 2] = "\u0414\u043E\u043D";
    Roles[Roles["\u041C\u0430\u0444\u0456\u044F"] = 3] = "\u041C\u0430\u0444\u0456\u044F";
    Roles[Roles["\u041C\u0438\u0440\u043D\u0438\u0439"] = 4] = "\u041C\u0438\u0440\u043D\u0438\u0439";
})(Roles = exports.Roles || (exports.Roles = {}));
var BestPlayers;
(function (BestPlayers) {
    BestPlayers[BestPlayers["None"] = 0] = "None";
    BestPlayers[BestPlayers["Best1"] = 1] = "Best1";
    BestPlayers[BestPlayers["Best2"] = 2] = "Best2";
    BestPlayers[BestPlayers["Best3"] = 3] = "Best3";
})(BestPlayers = exports.BestPlayers || (exports.BestPlayers = {}));
var Role = (function () {
    function Role(role, label) {
        this.role = role;
        this.label = label;
    }
    return Role;
}());
exports.Role = Role;
var BestPlayer = (function () {
    function BestPlayer(value, label, enabled) {
        this.value = value;
        this.label = label;
        this.enabled = enabled;
    }
    return BestPlayer;
}());
exports.BestPlayer = BestPlayer;
var PlayerEntry = (function () {
    function PlayerEntry(player) {
        if (player === void 0) { player = {
            index: null,
            nick: '',
            role: null,
            foul: null,
            bestPlayer: new BestPlayer(BestPlayers.None, '', true),
            result: null,
            mainScore: 0,
            additionalScore: 0,
            positionInKillQueue: null,
            killedAtDay: false,
            killedAtNight: false,
            checkedAtNight: null,
            rolesAvailable: [new Role(Roles.Шериф, Roles[1]), new Role(Roles.Дон, Roles[2]), new Role(Roles.Мафія, Roles[3]), new Role(Roles.Мирний, Roles[4])],
            bestPlayersAvailable: [new BestPlayer(BestPlayers.None, '', true), new BestPlayer(BestPlayers.Best1, 'Кращий 1', true),
                new BestPlayer(BestPlayers.Best2, 'Кращий 2', true), new BestPlayer(BestPlayers.Best3, 'Кращий 3', true)],
            halfBestWay: false,
            fullBestWay: false
        }; }
        this.index = player.index;
        this.nick = player.nick;
        this.role = player.role;
        this.foul = player.foul;
        this.bestPlayer = player.bestPlayer;
        this.result = player.result;
        this.mainScore = player.mainScore;
        this.additionalScore = player.additionalScore;
        this.positionInKillQueue = player.positionInKillQueue;
        this.killedAtDay = player.killedAtDay;
        this.killedAtNight = player.killedAtNight;
        this.checkedAtNight = player.checkedAtNight;
        this.rolesAvailable = player.rolesAvailable;
        this.bestPlayersAvailable = player.bestPlayersAvailable;
        this.halfBestWay = player.halfBestWay;
        this.fullBestWay = player.fullBestWay;
    }
    return PlayerEntry;
}());
exports.PlayerEntry = PlayerEntry;
var Protocol = (function () {
    function Protocol(protocol) {
        if (protocol === void 0) { protocol = {
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
            ugadaykaEnabled: false,
            falseSheriff: null,
            sheriffFirstKilled: false,
            players: null
        }; }
        this.winner = protocol.winner;
        this.game = protocol.game;
        this.table = protocol.table;
        this.killedAtDay = protocol.killedAtDay;
        this.killedAtNight = protocol.killedAtNight;
        this.bestWay = protocol.bestWay;
        this.donCheck = protocol.donCheck;
        this.sheriffCheck = protocol.sheriffCheck;
        this.threeCheck = protocol.threeCheck;
        this.techRed = protocol.techRed;
        this.techBlack = protocol.techBlack;
        this.ugadayka = protocol.ugadayka;
        this.ugadaykaEnabled = protocol.ugadaykaEnabled;
        this.falseSheriff = protocol.falseSheriff;
        this.sheriffFirstKilled = protocol.sheriffFirstKilled;
        this.players = protocol.players;
    }
    return Protocol;
}());
exports.Protocol = Protocol;
var PlayerDto = (function () {
    function PlayerDto() {
    }
    return PlayerDto;
}());
exports.PlayerDto = PlayerDto;
var ServiceProps = (function () {
    function ServiceProps() {
        this.night = true;
        this.notOnVote = Array.apply(null, { length: 10 }).map(function (value, index) { return index + 1; });
        this.onVote = [];
        this.killQueue = 1;
        this.miskills = 0;
        this.canFillRedRoles = false;
        this.canClearRoles = false;
        this.rolesValid = false;
        this.nicksValid = false;
        this.checkVisibility = false;
        this.checkSuccess = null;
        this.checkTypeIsDon = null;
        this.currentCheckIndex = null;
    }
    return ServiceProps;
}());
exports.ServiceProps = ServiceProps;
//# sourceMappingURL=ProtocolEnums.js.map