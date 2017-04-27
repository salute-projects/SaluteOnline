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
var SoCoreService = (function () {
    function SoCoreService() {
        this.ratingSystemConsts = {
            redOnWinScore: 4,
            blackOnWinScore: 4,
            donOnWinScore: 5,
            sheriffOnWinScore: 5,
            redOnLoseScore: 0,
            blackOnLoseScore: 0,
            donOnLoseScore: -1,
            sheriffOnLoseScore: -1,
            pipeIncludesBestWay: true,
            bestWayBonusAsAdditional: false,
            halfBestWayBonus: 0.5,
            fullBestWayBonus: 1,
            countBestWayForBlack: true,
            pipeIncludesDonCheck: true,
            donCheckBonusAsAdditional: false,
            donCheckBonus: 0.5,
            pipeIncludesThreeZvCheck: true,
            threeZvBonusAsAdditional: false,
            threeZvBonus: 1,
            pipeIncludesTechnicalCheck: true,
            technicalBonusAsAdditional: false,
            redTechnicalBonus: 1,
            blackTechnicalBonus: 1,
            pipeIncludesUgadaykaCheck: true,
            ugadaykaCheckAsAdditional: false,
            redUgadaykaBonus: 1,
            blackUgadaykaBonus: 1,
            pipeIncludesFirstKillCheck: true,
            donGetsBonusForSheriffFirstKill: true,
            sheriffGetsBonusIfFirstKilled: true,
            donFirstKillBonusAsAdditional: false,
            sheriffFirstKillBonusAsAdditional: false,
            firstKillDonBonus: 1,
            firstKillSheriffBonus: 1,
            pipeIncludesBestPlayersCheck: true,
            bestPlayerBonusAsAdditional: false,
            firstBestBonus: 1,
            secondBestBonus: 0.5,
            thirdBestBonus: 0.5,
            pipeIncludesFalseComCheck: true,
            falseComBonusAsAdditional: false,
            falseComBonus: 1,
            pipeIncludesBanCheck: true,
            banBonusAsAdditional: false,
            bannedBonus: -1,
            clearBannedResults: true
        };
    }
    SoCoreService.prototype.processProtocol = function (protocol, players) {
        this.clearResults(players);
        this.setResult(protocol, players);
        if (this.ratingSystemConsts.pipeIncludesBestWay) {
            this.bestWayCount(protocol, players);
        }
        if (this.ratingSystemConsts.pipeIncludesDonCheck) {
            this.donCheck(protocol, players);
        }
        if (this.ratingSystemConsts.pipeIncludesThreeZvCheck) {
            this.threeZvCheck(protocol, players);
        }
        if (this.ratingSystemConsts.pipeIncludesTechnicalCheck) {
            this.technicalCheck(protocol, players);
        }
        if (this.ratingSystemConsts.pipeIncludesUgadaykaCheck) {
            this.checkUgadayka(protocol, players);
        }
        if (this.ratingSystemConsts.pipeIncludesFirstKillCheck) {
            this.checkFirstKill(protocol, players);
        }
        if (this.ratingSystemConsts.pipeIncludesBestPlayersCheck) {
            this.checkBestPlayers(players);
        }
        if (this.ratingSystemConsts.pipeIncludesFalseComCheck) {
            this.checkFalseCom(protocol, players);
        }
        if (this.ratingSystemConsts.pipeIncludesBanCheck) {
            this.foulCheck(players);
        }
        this.countSumResult(players);
    };
    SoCoreService.prototype.clearResults = function (players) {
        players.forEach(function (t) {
            t.mainScore = 0;
            t.additionalScore = 0;
            t.result = 0;
        });
    };
    SoCoreService.prototype.setResult = function (protocol, players) {
        var _this = this;
        if (this.redWins(protocol)) {
            players.forEach(function (player) {
                switch (player.role.role) {
                    case ProtocolEnums_1.Roles.Дон:
                        player.mainScore = _this.ratingSystemConsts.donOnLoseScore;
                        break;
                    case ProtocolEnums_1.Roles.Мафія:
                        player.mainScore = _this.ratingSystemConsts.blackOnLoseScore;
                        break;
                    case ProtocolEnums_1.Roles.Мирний:
                        player.mainScore = _this.ratingSystemConsts.redOnWinScore;
                        break;
                    case ProtocolEnums_1.Roles.Шериф:
                        player.mainScore = _this.ratingSystemConsts.sheriffOnWinScore;
                        break;
                    default:
                        player.mainScore = null;
                        break;
                }
            });
        }
        else if (this.blackWins(protocol)) {
            players.forEach(function (player) {
                switch (player.role.role) {
                    case ProtocolEnums_1.Roles.Дон:
                        player.mainScore = _this.ratingSystemConsts.donOnWinScore;
                        break;
                    case ProtocolEnums_1.Roles.Мафія:
                        player.mainScore = _this.ratingSystemConsts.blackOnWinScore;
                        break;
                    case ProtocolEnums_1.Roles.Мирний:
                        player.mainScore = _this.ratingSystemConsts.redOnLoseScore;
                        break;
                    case ProtocolEnums_1.Roles.Шериф:
                        player.mainScore = _this.ratingSystemConsts.sheriffOnLoseScore;
                        break;
                    default:
                        player.mainScore = null;
                        break;
                }
            });
        }
    };
    SoCoreService.prototype.bestWayCount = function (protocol, players) {
        var _this = this;
        if (protocol.bestWay.length !== 3 || !protocol.bestWay[0] || !protocol.bestWay[1] || !protocol.bestWay[2])
            return;
        var firstKilled = players.find(function (t) { return t.index === protocol.killedAtNight[0]; });
        if (!firstKilled)
            return;
        var chosenPlayers = [];
        players.forEach(function (value) {
            if (protocol.bestWay.includes(value.index) && _this.isBlack(value))
                chosenPlayers.push(value);
        });
        if (chosenPlayers.length === 2) {
            if ((this.isBlack(firstKilled) && this.ratingSystemConsts.countBestWayForBlack) || this.isRed(firstKilled)) {
                if (this.ratingSystemConsts.bestWayBonusAsAdditional) {
                    firstKilled.additionalScore += this.ratingSystemConsts.halfBestWayBonus;
                }
                else {
                    firstKilled.mainScore += this.ratingSystemConsts.halfBestWayBonus;
                }
                firstKilled.halfBestWay = true;
            }
        }
        else if (chosenPlayers.length === 3) {
            if ((this.isBlack(firstKilled) && this.ratingSystemConsts.countBestWayForBlack) || this.isRed(firstKilled)) {
                if (this.ratingSystemConsts.bestWayBonusAsAdditional) {
                    firstKilled.additionalScore += this.ratingSystemConsts.fullBestWayBonus;
                }
                else {
                    firstKilled.mainScore += this.ratingSystemConsts.fullBestWayBonus;
                }
                firstKilled.fullBestWay = true;
            }
        }
    };
    SoCoreService.prototype.donCheck = function (protocol, players) {
        if (!protocol.donCheck)
            return;
        var don = players.find(function (t) { return t.role.role === ProtocolEnums_1.Roles.Дон; });
        var target = players.find(function (t) { return t.index === protocol.donCheck; });
        if (!target || !don)
            return;
        if (target.role.role === ProtocolEnums_1.Roles.Шериф) {
            if (this.ratingSystemConsts.donCheckBonusAsAdditional) {
                don.additionalScore += this.ratingSystemConsts.donCheckBonus;
            }
            else {
                don.mainScore += this.ratingSystemConsts.donCheckBonus;
            }
        }
    };
    SoCoreService.prototype.threeZvCheck = function (protocol, players) {
        if (!protocol.threeCheck)
            return;
        var sheriff = players.find(function (t) { return t.role.role === ProtocolEnums_1.Roles.Шериф; });
        if (!sheriff)
            return;
        if (this.ratingSystemConsts.threeZvBonusAsAdditional) {
            sheriff.additionalScore += this.ratingSystemConsts.threeZvBonus;
        }
        else {
            sheriff.mainScore += this.ratingSystemConsts.threeZvBonus;
        }
    };
    SoCoreService.prototype.technicalCheck = function (protocol, players) {
        var _this = this;
        if (!protocol.techRed && !protocol.techBlack)
            return;
        if (protocol.techBlack) {
            players.forEach(function (player) {
                if (_this.isBlack(player)) {
                    if (_this.ratingSystemConsts.technicalBonusAsAdditional) {
                        player.additionalScore += _this.ratingSystemConsts.blackTechnicalBonus;
                    }
                    else {
                        player.mainScore += _this.ratingSystemConsts.blackTechnicalBonus;
                    }
                }
            });
        }
        else if (protocol.techRed) {
            players.forEach(function (player) {
                if (_this.isRed(player)) {
                    if (_this.ratingSystemConsts.technicalBonusAsAdditional) {
                        player.additionalScore += _this.ratingSystemConsts.redTechnicalBonus;
                    }
                    else {
                        player.mainScore += _this.ratingSystemConsts.redTechnicalBonus;
                    }
                }
            });
        }
    };
    SoCoreService.prototype.checkUgadayka = function (protocol, players) {
        var _this = this;
        if (!protocol.ugadaykaEnabled || protocol.ugadayka.length !== 3)
            return;
        if (this.blackWins(protocol)) {
            players.forEach(function (player) {
                if (protocol.ugadayka.includes(player.index) && _this.isBlack(player)) {
                    if (_this.ratingSystemConsts.ugadaykaCheckAsAdditional) {
                        player.additionalScore += _this.ratingSystemConsts.blackUgadaykaBonus;
                    }
                    else {
                        player.mainScore += _this.ratingSystemConsts.blackUgadaykaBonus;
                    }
                }
            });
        }
        else if (this.redWins(protocol)) {
            players.forEach(function (player) {
                if (protocol.ugadayka.includes(player.index) && _this.isRed(player)) {
                    if (_this.ratingSystemConsts.ugadaykaCheckAsAdditional) {
                        player.additionalScore += _this.ratingSystemConsts.redUgadaykaBonus;
                    }
                    else {
                        player.mainScore += _this.ratingSystemConsts.redUgadaykaBonus;
                    }
                }
            });
        }
    };
    SoCoreService.prototype.checkFirstKill = function (protocol, players) {
        if (!protocol.killedAtNight[0])
            return;
        var don = players.find(function (t) { return t.role.role === ProtocolEnums_1.Roles.Дон; });
        var sheriff = players.find(function (player) { return player.role.role === ProtocolEnums_1.Roles.Шериф; });
        if (!don || !sheriff)
            return;
        if (this.blackWins(protocol) && protocol.killedAtNight[0] === sheriff.index && this.ratingSystemConsts.donGetsBonusForSheriffFirstKill) {
            if (this.ratingSystemConsts.donFirstKillBonusAsAdditional) {
                don.additionalScore += this.ratingSystemConsts.firstKillDonBonus;
            }
            else {
                don.mainScore += this.ratingSystemConsts.firstKillDonBonus;
            }
        }
        if (protocol.sheriffFirstKilled && this.blackWins(protocol) && this.ratingSystemConsts.sheriffGetsBonusIfFirstKilled) {
            if (this.ratingSystemConsts.sheriffFirstKillBonusAsAdditional) {
                sheriff.additionalScore += this.ratingSystemConsts.firstKillSheriffBonus;
            }
            else {
                sheriff.mainScore += this.ratingSystemConsts.firstKillSheriffBonus;
            }
        }
    };
    SoCoreService.prototype.checkBestPlayers = function (players) {
        var firstBest = players.find(function (t) { return t.bestPlayer.value === ProtocolEnums_1.BestPlayers.Best1; });
        var secondBest = players.find(function (t) { return t.bestPlayer.value === ProtocolEnums_1.BestPlayers.Best2; });
        var thirdBest = players.find(function (t) { return t.bestPlayer.value === ProtocolEnums_1.BestPlayers.Best3; });
        if (firstBest) {
            if (this.ratingSystemConsts.bestPlayerBonusAsAdditional) {
                firstBest.additionalScore += this.ratingSystemConsts.firstBestBonus;
            }
            else {
                firstBest.mainScore += this.ratingSystemConsts.firstBestBonus;
            }
        }
        if (secondBest) {
            if (this.ratingSystemConsts.bestPlayerBonusAsAdditional) {
                secondBest.additionalScore += this.ratingSystemConsts.secondBestBonus;
            }
            else {
                secondBest.mainScore += this.ratingSystemConsts.secondBestBonus;
            }
        }
        if (thirdBest) {
            if (this.ratingSystemConsts.bestPlayerBonusAsAdditional) {
                thirdBest.additionalScore += this.ratingSystemConsts.thirdBestBonus;
            }
            else {
                thirdBest.mainScore += this.ratingSystemConsts.thirdBestBonus;
            }
        }
    };
    SoCoreService.prototype.checkFalseCom = function (protocol, players) {
        if (!protocol.falseSheriff || !this.blackWins(protocol))
            return;
        var falseCom = players.find(function (t) { return t.index === protocol.falseSheriff; });
        if (!falseCom)
            return;
        if (this.ratingSystemConsts.falseComBonusAsAdditional) {
            falseCom.additionalScore += this.ratingSystemConsts.falseComBonus;
        }
        else {
            falseCom.mainScore += this.ratingSystemConsts.falseComBonus;
        }
    };
    SoCoreService.prototype.foulCheck = function (players) {
        var _this = this;
        players.forEach(function (player) {
            if (player.foul === 4) {
                if (_this.ratingSystemConsts.clearBannedResults) {
                    player.additionalScore = 0;
                    player.mainScore = 0;
                }
                if (_this.ratingSystemConsts.banBonusAsAdditional) {
                    player.additionalScore += _this.ratingSystemConsts.bannedBonus;
                }
                else {
                    player.mainScore += _this.ratingSystemConsts.bannedBonus;
                }
            }
        });
    };
    SoCoreService.prototype.countSumResult = function (players) {
        players.forEach(function (t) {
            t.result = t.mainScore + t.additionalScore;
        });
    };
    SoCoreService.prototype.redWins = function (protocol) {
        return parseInt(protocol.winner.toString()) === ProtocolEnums_1.Teams.Red;
    };
    SoCoreService.prototype.blackWins = function (protocol) {
        return parseInt(protocol.winner.toString()) === ProtocolEnums_1.Teams.Black;
    };
    SoCoreService.prototype.isBlack = function (player) {
        return player.role && (player.role.role === ProtocolEnums_1.Roles.Дон || player.role.role === ProtocolEnums_1.Roles.Мафія);
    };
    SoCoreService.prototype.isRed = function (player) {
        return player.role && (player.role.role === ProtocolEnums_1.Roles.Мирний || player.role.role === ProtocolEnums_1.Roles.Шериф);
    };
    return SoCoreService;
}());
SoCoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SoCoreService);
exports.SoCoreService = SoCoreService;
//# sourceMappingURL=protocol.service.js.map