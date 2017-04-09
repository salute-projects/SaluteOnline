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
    function BestPlayer(value, label) {
        this.value = value;
        this.label = label;
    }
    return BestPlayer;
}());
exports.BestPlayer = BestPlayer;
var PlayerEntry = (function () {
    function PlayerEntry(player) {
        if (player === void 0) { player = {
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
                new BestPlayer(BestPlayers.Best2, 'Кращий 2'), new BestPlayer(BestPlayers.Best3, 'Кращий 3')]
        }; }
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
    return PlayerEntry;
}());
exports.PlayerEntry = PlayerEntry;
//# sourceMappingURL=ProtocolEnums.js.map