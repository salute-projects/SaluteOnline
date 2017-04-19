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
var TimerObservable_1 = require("rxjs/observable/TimerObservable");
var ProtocolEnums_1 = require("../../domain/ProtocolEnums");
var SoProtocol = (function () {
    function SoProtocol() {
        this.setInitialState();
        this.players = new Array();
        for (var i = 0; i < 10; i++) {
            var player = new ProtocolEnums_1.PlayerEntry();
            player.index = i + 1;
            this.players.push(player);
        }
        this.defaultRolesAvailable = [new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Шериф, ProtocolEnums_1.Roles[1]), new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Дон, ProtocolEnums_1.Roles[2]), new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Мафія, ProtocolEnums_1.Roles[3]), new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Мирний, ProtocolEnums_1.Roles[4])
        ];
    }
    SoProtocol.prototype.searchNick = function (event) {
    };
    SoProtocol.prototype.setInitialState = function () {
        this.serviceProps = {
            night: true,
            notOnVote: Array.apply(null, { length: 10 }).map(function (value, index) { return index + 1; }),
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
        };
        this.timerProps = {
            timerVisible: false,
            timerSpeaker: false,
            halfTime: false,
            tick: 0,
            timerSubscription: null,
            timerDisplay: '00',
            active: false,
            startTick: 0
        };
        this.protocol = new ProtocolEnums_1.Protocol;
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
    SoProtocol.prototype.uniqueNumbers = function (object, index) {
        if (object[index] === 0) {
            object[index] = null;
            return;
        }
        var other = [];
        object.forEach(function (value, ind) {
            if (ind !== index)
                other.push(value);
        });
        if (other.includes(object[index])) {
            if (object[index] < 10) {
                object[index]++;
            }
            else {
                object[index] = null;
            }
        }
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
        this.processUgadayka();
        this.processFirstKill();
        this.autoEvaluate();
    };
    SoProtocol.prototype.miskill = function () {
        this.serviceProps.miskills++;
        this.autoEvaluate();
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
    SoProtocol.prototype.processUgadayka = function () {
        var alive = this.players.filter(function (t) { return !t.killedAtDay && !t.killedAtNight; });
        if (alive.length === 3) {
            this.protocol.ugadayka = alive.map(function (t) { return t.index; });
            this.serviceProps.ugadaykaEnabled = true;
        }
    };
    SoProtocol.prototype.processFirstKill = function () {
        var _this = this;
        if (!this.protocol.killedAtNight[0])
            return;
        if (this.players.find(function (t) { return t.index === _this.protocol.killedAtNight[0]; }).role.role === ProtocolEnums_1.Roles.Шериф) {
            this.protocol.sheriffFirstKilled = true;
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
        return this.players.filter(function (t) { return t.nick === ''; }).length === 0;
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
    SoProtocol.prototype.clearNicks = function () {
        this.players.forEach(function (player) { player.nick = ""; });
    };
    SoProtocol.prototype.autoEvaluate = function () {
        var ended = this.checkGameEnd();
        if (ended) {
            this.countResults();
        }
    };
    SoProtocol.prototype.evaluate = function () {
        this.countResults();
    };
    SoProtocol.prototype.countResults = function () {
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
    };
    SoProtocol.prototype.checkGameEnd = function () {
        var _this = this;
        if (this.serviceProps.miskills === 3) {
            this.protocol.winner = ProtocolEnums_1.Teams.Red;
            return true;
        }
        else {
            var aliveRed = this.players.filter(function (t) { return !t.killedAtDay && !t.killedAtNight && _this.isRed(t); });
            var aliveBlack = this.players.filter(function (t) { return !t.killedAtDay && !t.killedAtNight && _this.isBlack(t); });
            if (aliveRed.length === aliveBlack.length) {
                this.protocol.winner = ProtocolEnums_1.Teams.Black;
                if (aliveBlack.length === 3) {
                    this.protocol.techBlack = true;
                }
                return true;
            }
            if (aliveBlack.length === 0) {
                this.protocol.winner = ProtocolEnums_1.Teams.Red;
                if (!this.players.some(function (t) { return _this.isRed(t) && t.killedAtDay; })) {
                    this.protocol.techRed = true;
                }
                return true;
            }
        }
        return false;
    };
    SoProtocol.prototype.setResult = function () {
        if (this.redWins()) {
            this.players.forEach(function (player) {
                switch (player.role.role) {
                    case ProtocolEnums_1.Roles.Дон:
                        player.result = -1;
                        break;
                    case ProtocolEnums_1.Roles.Мафія:
                        player.result = 0;
                        break;
                    case ProtocolEnums_1.Roles.Мирний:
                        player.result = 4;
                        break;
                    case ProtocolEnums_1.Roles.Шериф:
                        player.result = 5;
                        break;
                    default:
                        player.result = null;
                        break;
                }
            });
        }
        else if (this.blackWins()) {
            this.players.forEach(function (player) {
                switch (player.role.role) {
                    case ProtocolEnums_1.Roles.Дон:
                        player.result = 5;
                        break;
                    case ProtocolEnums_1.Roles.Мафія:
                        player.result = 4;
                        break;
                    case ProtocolEnums_1.Roles.Мирний:
                        player.result = 0;
                        break;
                    case ProtocolEnums_1.Roles.Шериф:
                        player.result = -1;
                        break;
                    default:
                        player.result = null;
                        break;
                }
            });
        }
    };
    SoProtocol.prototype.bestWayCount = function () {
        var _this = this;
        if (this.protocol.bestWay.length !== 3 || !this.protocol.bestWay[0] || !this.protocol.bestWay[1] || !this.protocol.bestWay[2])
            return;
        var firstKilled = this.players.find(function (t) { return t.positionInKillQueue === 1; });
        if (!firstKilled)
            return;
        var chosenPlayers = [];
        this.players.forEach(function (value) {
            if (_this.protocol.bestWay.includes(value.index) && _this.isBlack(value))
                chosenPlayers.push(value);
        });
        if (chosenPlayers.length === 2) {
            firstKilled.result += 0.5;
            firstKilled.halfBestWay = true;
        }
        else if (chosenPlayers.length === 3) {
            firstKilled.result++;
            firstKilled.fullBestWay = true;
        }
    };
    SoProtocol.prototype.donCheck = function () {
        var _this = this;
        if (!this.protocol.donCheck)
            return;
        var don = this.players.find(function (t) { return t.role.role === ProtocolEnums_1.Roles.Дон; });
        var target = this.players.find(function (t) { return t.index === _this.protocol.donCheck; });
        if (!target || !don)
            return;
        if (target.role.role === ProtocolEnums_1.Roles.Шериф)
            don.result += 0.5;
    };
    SoProtocol.prototype.threeZvCheck = function () {
        if (!this.protocol.threeCheck)
            return;
        var sheriff = this.players.find(function (t) { return t.role.role === ProtocolEnums_1.Roles.Шериф; });
        if (!sheriff)
            return;
        sheriff.result++;
    };
    SoProtocol.prototype.technicalCheck = function () {
        var _this = this;
        if (!this.protocol.techRed && !this.protocol.techBlack)
            return;
        if (this.protocol.techBlack) {
            this.players.forEach(function (player) {
                if (_this.isBlack(player))
                    player.result++;
            });
        }
        else if (this.protocol.techRed) {
            this.players.forEach(function (player) {
                if (_this.isRed(player))
                    player.result++;
            });
        }
    };
    SoProtocol.prototype.checkUgadayka = function () {
        var _this = this;
        if (!this.serviceProps.ugadaykaEnabled || this.protocol.ugadayka.length !== 3)
            return;
        if (parseInt(this.protocol.winner.toString()) === ProtocolEnums_1.Teams.Black) {
            this.players.forEach(function (player) {
                if (_this.protocol.ugadayka.includes(player.index) && _this.isBlack(player)) {
                    player.result++;
                }
            });
        }
        else if (parseInt(this.protocol.winner.toString()) === ProtocolEnums_1.Teams.Red) {
            this.players.forEach(function (player) {
                if (_this.protocol.ugadayka.includes(player.index) && _this.isRed(player)) {
                    player.result++;
                }
            });
        }
    };
    SoProtocol.prototype.checkFirstKill = function () {
        if (!this.protocol.killedAtNight[0])
            return;
        var don = this.players.find(function (t) { return t.role.role === ProtocolEnums_1.Roles.Дон; });
        var sheriff = this.players.find(function (player) { return player.role.role === ProtocolEnums_1.Roles.Шериф; });
        if (!don || !sheriff)
            return;
        if (parseInt(this.protocol.winner.toString()) === ProtocolEnums_1.Teams.Black &&
            this.protocol.killedAtNight[0] === sheriff.index) {
            don.result++;
        }
        if (this.protocol.sheriffFirstKilled && this.blackWins()) {
            sheriff.result++;
        }
    };
    SoProtocol.prototype.checkBestPlayers = function () {
        var firstBest = this.players.find(function (t) { return t.bestPlayer.value === ProtocolEnums_1.BestPlayers.Best1; });
        var secondBest = this.players.find(function (t) { return t.bestPlayer.value === ProtocolEnums_1.BestPlayers.Best2; });
        var thirdBest = this.players.find(function (t) { return t.bestPlayer.value === ProtocolEnums_1.BestPlayers.Best3; });
        if (firstBest) {
            firstBest.result++;
        }
        if (secondBest) {
            secondBest.result += 0.5;
        }
        if (thirdBest) {
            thirdBest.result += 0.5;
        }
    };
    SoProtocol.prototype.checkFalseCom = function () {
        var _this = this;
        if (!this.protocol.falseSheriff || this.blackWins())
            return;
        var falseCom = this.players.find(function (t) { return t.index === _this.protocol.falseSheriff; });
        if (!falseCom)
            return;
        falseCom.result++;
    };
    SoProtocol.prototype.foulCheck = function () {
        this.players.forEach(function (player) {
            if (player.foul === 4)
                player.result = -1;
        });
    };
    SoProtocol.prototype.winnerChanged = function () {
        this.protocol.techRed = false;
        this.protocol.techBlack = false;
        this.players.forEach(function (t) { return t.result = null; });
        this.checkEnabledBestPlayers();
    };
    SoProtocol.prototype.checkEnabledBestPlayers = function () {
        var _this = this;
        if (this.blackWins()) {
            this.players.forEach(function (t) {
                if (_this.isBlack(t)) {
                    t.bestPlayersAvailable.forEach(function (z) {
                        if (z.value === ProtocolEnums_1.BestPlayers.Best3)
                            z.enabled = false;
                    });
                }
                if (_this.isRed(t)) {
                    t.bestPlayersAvailable.forEach(function (z) {
                        if (z.value === ProtocolEnums_1.BestPlayers.Best1 || z.value === ProtocolEnums_1.BestPlayers.Best2) {
                            z.enabled = false;
                        }
                    });
                }
            });
        }
        else if (this.redWins()) {
            this.players.forEach(function (t) {
                if (_this.isBlack(t)) {
                    t.bestPlayersAvailable.forEach(function (z) {
                        if (z.value === ProtocolEnums_1.BestPlayers.Best1 || z.value === ProtocolEnums_1.BestPlayers.Best2)
                            z.enabled = false;
                    });
                }
                if (_this.isRed(t)) {
                    t.bestPlayersAvailable.forEach(function (z) {
                        if (z.value === ProtocolEnums_1.BestPlayers.Best3) {
                            z.enabled = false;
                        }
                    });
                }
            });
        }
    };
    SoProtocol.prototype.bestPlayerSelected = function (player) {
        if (player.bestPlayer.value !== ProtocolEnums_1.BestPlayers.None) {
            this.players.forEach(function (t) {
                if (t.index !== player.index)
                    t.bestPlayersAvailable.find(function (z) { return z.value === player.bestPlayer.value; }).enabled = false;
            });
        }
        else {
            var currentlySelected_1 = this.players.map(function (t) { return t.bestPlayer.value; });
            this.players.forEach(function (t) {
                t.bestPlayersAvailable.forEach(function (z) {
                    if (!currentlySelected_1.includes(z.value)) {
                        z.enabled = true;
                    }
                });
            });
        }
    };
    SoProtocol.prototype.isBlack = function (player) {
        return player.role && (player.role.role === ProtocolEnums_1.Roles.Дон || player.role.role === ProtocolEnums_1.Roles.Мафія);
    };
    SoProtocol.prototype.isRed = function (player) {
        return player.role && (player.role.role === ProtocolEnums_1.Roles.Мирний || player.role.role === ProtocolEnums_1.Roles.Шериф);
    };
    SoProtocol.prototype.redWins = function () {
        return parseInt(this.protocol.winner.toString()) === ProtocolEnums_1.Teams.Red;
    };
    SoProtocol.prototype.blackWins = function () {
        return parseInt(this.protocol.winner.toString()) === ProtocolEnums_1.Teams.Black;
    };
    SoProtocol.prototype.showCheck = function (donCheck) {
        this.serviceProps.checkTypeIsDon = donCheck;
        this.serviceProps.checkVisibility = true;
    };
    SoProtocol.prototype.check = function (index) {
        this.serviceProps.currentCheckIndex = index;
        if (this.serviceProps.checkTypeIsDon) {
            this.serviceProps.checkSuccess = this.players.find(function (t) { return t.index === index; }).role.role === ProtocolEnums_1.Roles.Шериф;
        }
        else {
            this.serviceProps.checkSuccess = this.isBlack(this.players.find(function (t) { return t.index === index; }));
        }
    };
    SoProtocol.prototype.closeCheck = function () {
        this.serviceProps.checkSuccess = null;
        this.serviceProps.checkVisibility = false;
        if (this.serviceProps.checkTypeIsDon && !this.protocol.donCheck) {
            this.protocol.donCheck = this.serviceProps.currentCheckIndex;
        }
        else if (!this.serviceProps.checkTypeIsDon && !this.protocol.sheriffCheck) {
            this.protocol.sheriffCheck = this.serviceProps.currentCheckIndex;
        }
        this.serviceProps.currentCheckIndex = null;
    };
    SoProtocol.prototype.checkDisabled = function () {
        return this.players.some(function (t) { return t.role === null; });
    };
    SoProtocol.prototype.startTimer = function () {
        var _this = this;
        if (!this.timerProps.active) {
            this.timerProps.active = true;
            var timer = TimerObservable_1.TimerObservable.create(0, 1000);
            this.timerProps.timerSubscription = timer.takeWhile(function () { return _this.timerProps.tick < (_this.timerProps.halfTime ? 30 : 60); })
                .subscribe(function (t) {
                var currentWithGap = t + _this.timerProps.startTick;
                _this.timerProps.tick = currentWithGap;
                _this.timerProps.timerDisplay = currentWithGap < 10 ? "0" + currentWithGap : (currentWithGap).toString();
            });
        }
        else {
            this.timerProps.timerSubscription.unsubscribe();
            this.timerProps.timerSubscription = null;
            this.timerProps.startTick = this.timerProps.tick;
            this.timerProps.tick = 0;
            this.timerProps.active = false;
        }
    };
    SoProtocol.prototype.clearTimer = function () {
        this.timerProps.active = false;
        this.timerProps.startTick = 0;
        this.timerProps.tick = 0;
        this.timerProps.timerDisplay = "00";
        if (this.timerProps.timerSubscription) {
            this.timerProps.timerSubscription.unsubscribe();
        }
    };
    SoProtocol.prototype.getTimerColor = function () {
        return (this.timerProps.halfTime ? 30 : 60) - this.timerProps.tick <= 10 ? '#009eeb' : '#292929';
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