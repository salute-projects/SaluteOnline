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
var dialog_service_1 = require("../../services/dialog/dialog.service");
var IDialogProperties_1 = require("../../services/dialog/IDialogProperties");
var angular2_jwt_1 = require("angular2-jwt");
var urls_1 = require("../../services/urls");
var http_1 = require("@angular/http");
var players_service_1 = require("../../services/players/players.service");
var ProtocolEnums_1 = require("../../domain/ProtocolEnums");
var protocol_service_1 = require("../../services/protocol/protocol.service");
var SoProtocol = (function () {
    function SoProtocol(dialogService, authHttp, urlsService, playersService, coreService) {
        var _this = this;
        this.dialogService = dialogService;
        this.authHttp = authHttp;
        this.urlsService = urlsService;
        this.playersService = playersService;
        this.coreService = coreService;
        this.setInitialState();
        this.playersService.getAllNicknames().subscribe(function (t) {
            _this.allNicknames = t;
        });
    }
    SoProtocol.prototype.searchNick = function (event, index) {
        var query = event.query;
        var existing = this.players.map(function (t) { return t.nick; });
        this.nicknameSuggestions[index] = this.allNicknames.filter(function (item) { return item.toLowerCase().startsWith(query.toLowerCase()) && !existing.includes(item); });
    };
    SoProtocol.prototype.save = function () {
        var _this = this;
        this.prepareData();
        var requestOptions = new http_1.RequestOptions({
            method: http_1.RequestMethod.Post,
            url: this.urlsService.addProtocol,
            headers: new http_1.Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(this.protocol)
        });
        this.authHttp.request(new http_1.Request(requestOptions))
            .map(function (res) { return res.json(); })
            .subscribe(function () {
            var config = new IDialogProperties_1.DialogProperties();
            config.header = 'Збережено';
            config.content = 'Протокол успішно збережено. Створити новий?';
            _this.dialogService.show(config, null, null, true).then(function (res) {
                if (res) {
                    _this.setInitialState();
                }
            });
        }, function () {
            _this.dialogService.showError('Помилка при збереженні протоколу', null, null);
        });
    };
    SoProtocol.prototype.prepareData = function () {
        var players = [];
        this.players.forEach(function (t) {
            var dto = new ProtocolEnums_1.PlayerDto();
            dto.role = t.role.role;
            dto.bestPlayer = t.bestPlayer.value;
            dto.checkedAtNight = t.checkedAtNight;
            dto.foul = t.foul;
            dto.fullBestWay = t.fullBestWay;
            dto.halfBestWay = t.halfBestWay;
            dto.killedAtDay = t.killedAtDay;
            dto.killedAtNight = t.killedAtNight;
            dto.index = t.index;
            dto.nick = t.nick;
            dto.positionInKillQueue = t.positionInKillQueue;
            dto.result = t.result;
            players.push(dto);
        });
        this.protocol.players = players;
    };
    SoProtocol.prototype.clear = function () {
        var _this = this;
        var config = new IDialogProperties_1.DialogProperties();
        config.header = 'очистити';
        config.content = 'Очистити протокол?';
        this.dialogService.show(config, null, null, true).then(function (result) {
            if (result) {
                _this.setInitialState();
            }
        });
    };
    SoProtocol.prototype.setInitialState = function () {
        this.nicknameSuggestions = [];
        this.players = new Array();
        for (var i = 0; i < 10; i++) {
            var player = new ProtocolEnums_1.PlayerEntry();
            player.index = i + 1;
            this.players.push(player);
        }
        this.defaultRolesAvailable = [new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Шериф, ProtocolEnums_1.Roles[1]), new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Дон, ProtocolEnums_1.Roles[2]), new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Мафія, ProtocolEnums_1.Roles[3]), new ProtocolEnums_1.Role(ProtocolEnums_1.Roles.Мирний, ProtocolEnums_1.Roles[4])];
        this.serviceProps = new ProtocolEnums_1.ServiceProps();
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
        else if (player.foul === 4) {
            var config = new IDialogProperties_1.DialogProperties();
            config.header = 'Дискваліфікація';
            config.content = 'Дискваліфікувати гравця?';
            this.dialogService.show(config, null, null, true).then(function (result) {
                if (!result) {
                    player.foul = 3;
                }
            });
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
            this.protocol.ugadaykaEnabled = true;
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
        this.coreService.processProtocol(this.protocol, this.players);
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
    __metadata("design:paramtypes", [dialog_service_1.SoDialogService, angular2_jwt_1.AuthHttp, urls_1.UrlsService,
        players_service_1.PlayersService, protocol_service_1.SoCoreService])
], SoProtocol);
exports.SoProtocol = SoProtocol;
//# sourceMappingURL=protocol.component.js.map