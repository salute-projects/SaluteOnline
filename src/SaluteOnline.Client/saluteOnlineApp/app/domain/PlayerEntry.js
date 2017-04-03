"use strict";
var PlayerEntry = (function () {
    function PlayerEntry(player) {
        if (player === void 0) { player = {
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
//# sourceMappingURL=PlayerEntry.js.map