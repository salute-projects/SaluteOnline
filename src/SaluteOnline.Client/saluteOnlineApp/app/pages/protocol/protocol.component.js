"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ProtocolEnums_1 = require("../../domain/ProtocolEnums");
var SoProtocol = (function () {
    function SoProtocol() {
        this.setInitialState();
        this.players = new Array();
        for (var i = 0; i < 10; i++) {
            this.players.push(new ProtocolEnums_1.PlayerEntry());
        }
        this.defaultRolesAvailable = [new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Шериф, ProtocolEnums_1.Roles[1]), new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Дон, ProtocolEnums_1.Roles[2]), new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Мафія, ProtocolEnums_1.Roles[3]), new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Мирний, ProtocolEnums_1.Roles[4])
        ];
    }
    SoProtocol.prototype.searchNick = function (event) {
    };
    SoProtocol.prototype.setInitialState = function () {
        this.serviceProps = {
            night: false,
            notOnVote: Array.apply(null, { length: 10 }).map(function (value, index) { return index + 1; }),
            onVote: [],
            killQueue: 1,
            miskills: 0,
            canFillRedRoles: false,
            canClearRoles: false,
            ugadaykaEnabled: false,
            rolesValid: false,
            nicksValid: false
        };
        this.protocol = {
            winner: ProtocolEnums_1.Teams.None,
            game: null,
            table: null,
            killedAtDay: [],
            killedAtNight: []
        };
    };
    SoProtocol.prototype.addToVote = function (player) {
        this.serviceProps.onVote.push(player);
        this.serviceProps.notOnVote = this.serviceProps.notOnVote.filter(function (t) { return t !== player; }).sort(function (n1, n2) { return n1 - n2; });
    };
    SoProtocol.prototype.removeFromVote = function (player) {
        this.serviceProps.onVote = this.serviceProps.onVote.filter(function (t) { return t !== player; });
        this.serviceProps.notOnVote.push(player);
        this.serviceProps.notOnVote.sort(function (n1, n2) { return n1 - n2; });
    };
    SoProtocol.prototype.clearVoting = function () {
        this.serviceProps.notOnVote = Array.apply(null, { length: 10 }).map(function (value, index) { return index + 1; });
        this.serviceProps.onVote = [];
    };
    SoProtocol.prototype.foulsChange = function (player) {
        if (player.foul === 0) {
            player.foul = null;
        }
    };
    SoProtocol.prototype.zeroToNull = function (object, property) {
        if (typeof object[property] === "undefined")
            return;
        if (object[property] === 0)
            object[property] = null;
    };
    SoProtocol.prototype.kill = function (player, index) {
        if (this.serviceProps.night) {
            this.protocol.killedAtNight.push(index);
            player.killedAtNight = true;
        }
        else {
            this.protocol.killedAtDay.push(index);
            player.killedAtDay = true;
        }
        player.positionInKillQueue = this.serviceProps.killQueue;
        this.serviceProps.killQueue++;
        this.evaluate();
    };
    SoProtocol.prototype.miskill = function () {
        this.serviceProps.miskills++;
        this.evaluate();
    };
    SoProtocol.prototype.evaluate = function () {
        if (this.serviceProps.miskills === 3) {
            this.protocol.winner = ProtocolEnums_1.Teams.Red;
        }
        else {
            var aliveRed = this.players.filter(function (t) { return !t.killedAtDay && !t.killedAtNight && (t.role.role === ProtocolEnums_1.Roles.Мирний || t.role.role === ProtocolEnums_1.Roles.Шериф); });
            var aliveBlack = this.players.filter(function (t) { return !t.killedAtDay && !t.killedAtNight && (t.role.role === ProtocolEnums_1.Roles.Мафія || t.role.role === ProtocolEnums_1.Roles.Дон); });
            if (aliveRed.length === aliveBlack.length) {
                this.protocol.winner = ProtocolEnums_1.Teams.Black;
                return;
            }
            if (aliveBlack.length === 0) {
                this.protocol.winner = ProtocolEnums_1.Teams.Red;
                return;
            }
        }
    };
    SoProtocol.prototype.roleSelected = function () {
        this.isRolesValid();
        this.serviceProps.canClearRoles = this.players.filter(function (t) { return t.role !== null; }).length !== 10;
        this.processRole(ProtocolEnums_1.Roles.Шериф, ProtocolEnums_1.Roles[1], 1);
        this.processRole(ProtocolEnums_1.Roles.Дон, ProtocolEnums_1.Roles[2], 1);
        this.processRole(ProtocolEnums_1.Roles.Мафія, ProtocolEnums_1.Roles[3], 2);
        this.processRole(ProtocolEnums_1.Roles.Мирний, ProtocolEnums_1.Roles[4], 6);
        var notReds = this.players.filter(function (t) { return t.role !== null && (t.role.role === ProtocolEnums_1.Roles.Мафія || t.role.role === ProtocolEnums_1.Roles.Дон || t.role.role === ProtocolEnums_1.Roles.Шериф); });
        if (notReds.length >= 4) {
            this.serviceProps.canFillRedRoles = true;
        }
    };
    SoProtocol.prototype.isRolesValid = function () {
        if (this.players.filter(function (t) { return t.role === null; }).length > 0) {
            this.serviceProps.rolesValid = false;
            return;
        }
        else {
            var reds = this.players.filter(function (t) { return t.role.role === ProtocolEnums_1.Roles.Мирний; }).length;
            var blacks = this.players.filter(function (t) { return t.role.role === ProtocolEnums_1.Roles.Мафія; }).length;
            var sheriffs = this.players.filter(function (t) { return t.role.role === ProtocolEnums_1.Roles.Шериф; }).length;
            var dons = this.players.filter(function (t) { return t.role.role === ProtocolEnums_1.Roles.Дон; }).length;
            this.serviceProps.rolesValid = reds === 6 && blacks === 2 && sheriffs === 1 && dons === 1;
        }
    };
    SoProtocol.prototype.isNicksValid = function () {
        this.serviceProps.nicksValid = this.players.filter(function (t) { return t.nick === ''; }).length === 0;
    };
    SoProtocol.prototype.processRole = function (role, label, allowedCount) {
        if (this.players.filter(function (t) { return t.role !== null && t.role.role === role; }).length === allowedCount) {
            this.players.forEach(function (player) {
                if (player.role === null || player.role.role !== role)
                    player.rolesAvailable = player.rolesAvailable.filter(function (t) { return t.role !== role; });
            });
        }
        else {
            this.players.forEach(function (player) {
                if (!player.rolesAvailable.some(function (t) { return t
                    .role === role; }))
                    player.rolesAvailable.push(new ProtocolEnums_1.Role(role, label));
                player.rolesAvailable.sort(function (role1, role2) { return role1.role - role2.role; });
            });
        }
    };
    SoProtocol.prototype.nicksOnBlur = function () {
        this.isNicksValid();
    };
    SoProtocol.prototype.fillRedRoles = function () {
        this.players.forEach(function (player) { if (player.role === null)
            player.role = player.rolesAvailable.find(function (t) { return t.role === ProtocolEnums_1.Roles.Мирний; }); });
        this.isRolesValid();
    };
    SoProtocol.prototype.clearRoles = function () {
        var _this = this;
        this.players.forEach(function (player) {
            player.role = null;
            player.rolesAvailable = _this.defaultRolesAvailable.map(function (x) { return Object.assign({}, x); });
        });
        this.serviceProps.canFillRedRoles = false;
        this.serviceProps.canClearRoles = false;
    };
    SoProtocol.prototype.getBackgroundColor = function (role) {
        if (!this.serviceProps.night || role == null)
            return "transparent";
        switch (role.role) {
            case ProtocolEnums_1.Roles.Дон:
                return "#292929";
            case ProtocolEnums_1.Roles.Шериф:
                return "#D32F2F";
            case ProtocolEnums_1.Roles.Мафія:
                return "#535353";
            case ProtocolEnums_1.Roles.Мирний:
                return "#d74444";
            default:
                return "transparent";
        }
    };
    SoProtocol.prototype.getSelectColor = function (role) {
        return role != null;
    };
    return SoProtocol;
}());
SoProtocol = __decorate([
    core_1.Component({
        selector: 'so-protocol',
        providers: [],
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [require('./protocol.component.scss').toString()],
        template: require('./protocol.component.html')
    }),
    __metadata("design:paramtypes", [])
], SoProtocol);
exports.SoProtocol = SoProtocol;
//# sourceMappingURL=protocol.component.js.map