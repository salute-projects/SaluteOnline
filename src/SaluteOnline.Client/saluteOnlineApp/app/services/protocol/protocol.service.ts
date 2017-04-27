import { Injectable } from '@angular/core';
import { PlayerEntry, BestPlayer, BestPlayers, IPlayerEntry, IProtocol, PlayerDto, Protocol, Role, Roles, Teams, ServiceProps } from "../../domain/ProtocolEnums";

@Injectable()
export class SoCoreService {

    ratingSystemConsts : {
        redOnWinScore: number;
        blackOnWinScore: number;
        donOnWinScore: number;
        sheriffOnWinScore: number;
        redOnLoseScore: number;
        blackOnLoseScore: number;
        donOnLoseScore: number;
        sheriffOnLoseScore: number;

        pipeIncludesBestWay: boolean;
        bestWayBonusAsAdditional: boolean;
        halfBestWayBonus: number;
        fullBestWayBonus: number;
        countBestWayForBlack: boolean;

        pipeIncludesDonCheck: boolean;
        donCheckBonusAsAdditional: boolean;
        donCheckBonus: number;

        pipeIncludesThreeZvCheck: boolean;
        threeZvBonusAsAdditional: boolean;
        threeZvBonus: number;

        pipeIncludesTechnicalCheck: boolean;
        technicalBonusAsAdditional: boolean;
        redTechnicalBonus: number;
        blackTechnicalBonus: number;

        pipeIncludesUgadaykaCheck: boolean;
        ugadaykaCheckAsAdditional: boolean;
        redUgadaykaBonus: number;
        blackUgadaykaBonus: number;

        pipeIncludesFirstKillCheck: boolean;
        donGetsBonusForSheriffFirstKill: boolean;
        sheriffGetsBonusIfFirstKilled: boolean;
        donFirstKillBonusAsAdditional: boolean;
        sheriffFirstKillBonusAsAdditional: boolean;
        firstKillDonBonus: number;
        firstKillSheriffBonus: number;

        pipeIncludesBestPlayersCheck: boolean;
        bestPlayerBonusAsAdditional: boolean;
        firstBestBonus: number;
        secondBestBonus: number;
        thirdBestBonus: number;

        pipeIncludesFalseComCheck: boolean;
        falseComBonusAsAdditional: boolean;
        falseComBonus: number;

        pipeIncludesBanCheck: boolean;
        banBonusAsAdditional: boolean;
        bannedBonus: number;
        clearBannedResults: boolean;
    }

    constructor() {
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
        }
    }

    processProtocol(protocol: IProtocol, players: PlayerEntry[]) {
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
    }

    private clearResults(players: PlayerEntry[]) {
        players.forEach(t => {
            t.mainScore = 0;
            t.additionalScore = 0;
            t.result = 0;
        });
    }

    private setResult(protocol: IProtocol, players: PlayerEntry[]) {
        if (this.redWins(protocol)) {
            players.forEach((player: PlayerEntry) => {
                switch (player.role.role) {
                    case Roles.Дон:
                        player.mainScore = this.ratingSystemConsts.donOnLoseScore;
                        break;
                    case Roles.Мафія:
                        player.mainScore = this.ratingSystemConsts.blackOnLoseScore;
                        break;
                    case Roles.Мирний:
                        player.mainScore = this.ratingSystemConsts.redOnWinScore;
                        break;
                    case Roles.Шериф:
                        player.mainScore = this.ratingSystemConsts.sheriffOnWinScore;
                        break;
                    default:
                        player.mainScore = null;
                        break;
                }
            });
        } else if (this.blackWins(protocol)) {
            players.forEach((player: PlayerEntry) => {
                switch (player.role.role) {
                    case Roles.Дон:
                        player.mainScore = this.ratingSystemConsts.donOnWinScore;
                        break;
                    case Roles.Мафія:
                        player.mainScore = this.ratingSystemConsts.blackOnWinScore;
                        break;
                    case Roles.Мирний:
                        player.mainScore = this.ratingSystemConsts.redOnLoseScore;
                        break;
                    case Roles.Шериф:
                        player.mainScore = this.ratingSystemConsts.sheriffOnLoseScore;
                        break;
                    default:
                        player.mainScore = null;
                        break;
                }
            });
        }
    }

    private bestWayCount(protocol: IProtocol, players: PlayerEntry[]) {
        if (protocol.bestWay.length !== 3 || !protocol.bestWay[0] || !protocol.bestWay[1] || !protocol.bestWay[2])
            return;
        const firstKilled = players.find(t => t.index === protocol.killedAtNight[0]);
        if (!firstKilled)
            return;
        const chosenPlayers: PlayerEntry[] = [];
        players.forEach((value: PlayerEntry) => {
            if (protocol.bestWay.includes(value.index) && this.isBlack(value))
                chosenPlayers.push(value);
        });
        if (chosenPlayers.length === 2) {
            if ((this.isBlack(firstKilled) && this.ratingSystemConsts.countBestWayForBlack) || this.isRed(firstKilled)) {
                if (this.ratingSystemConsts.bestWayBonusAsAdditional) {
                    firstKilled.additionalScore += this.ratingSystemConsts.halfBestWayBonus;
                } else {
                    firstKilled.mainScore += this.ratingSystemConsts.halfBestWayBonus;
                }
                firstKilled.halfBestWay = true;   
            }
        } else if (chosenPlayers.length === 3) {
            if ((this.isBlack(firstKilled) && this.ratingSystemConsts.countBestWayForBlack) || this.isRed(firstKilled)) {
                if (this.ratingSystemConsts.bestWayBonusAsAdditional) {
                    firstKilled.additionalScore += this.ratingSystemConsts.fullBestWayBonus;
                } else {
                    firstKilled.mainScore += this.ratingSystemConsts.fullBestWayBonus;
                }
                firstKilled.fullBestWay = true;
            }
        }
    }

    private donCheck(protocol: IProtocol, players: PlayerEntry[]) {
        if (!protocol.donCheck)
            return;
        const don = players.find(t => { return t.role.role === Roles.Дон });
        const target = players.find(t => { return t.index === protocol.donCheck });
        if (!target || !don)
            return;
        if (target.role.role === Roles.Шериф) {
            if (this.ratingSystemConsts.donCheckBonusAsAdditional) {
                don.additionalScore += this.ratingSystemConsts.donCheckBonus;
            } else {
                don.mainScore += this.ratingSystemConsts.donCheckBonus; 
            }
        }
    }

    private threeZvCheck(protocol: IProtocol, players: PlayerEntry[]) {
        if (!protocol.threeCheck)
            return;
        const sheriff = players.find(t => { return t.role.role === Roles.Шериф });
        if (!sheriff)
            return;
        if (this.ratingSystemConsts.threeZvBonusAsAdditional) {
            sheriff.additionalScore += this.ratingSystemConsts.threeZvBonus;
        } else {
            sheriff.mainScore += this.ratingSystemConsts.threeZvBonus;
        }
    }

    private technicalCheck(protocol: IProtocol, players: PlayerEntry[]) {
        if (!protocol.techRed && !protocol.techBlack)
            return;
        if (protocol.techBlack) {
            players.forEach((player: PlayerEntry) => {
                if (this.isBlack(player)) {
                    if (this.ratingSystemConsts.technicalBonusAsAdditional) {
                        player.additionalScore += this.ratingSystemConsts.blackTechnicalBonus;
                    } else {
                        player.mainScore += this.ratingSystemConsts.blackTechnicalBonus;
                    }
                }
            });
        } else if (protocol.techRed) {
            players.forEach((player: PlayerEntry) => {
                if (this.isRed(player)) {
                    if (this.ratingSystemConsts.technicalBonusAsAdditional) {
                        player.additionalScore += this.ratingSystemConsts.redTechnicalBonus;
                    } else {
                        player.mainScore += this.ratingSystemConsts.redTechnicalBonus;
                    }
                }
            });
        }
    }

    private checkUgadayka(protocol: IProtocol, players: PlayerEntry[]) {
        if (!protocol.ugadaykaEnabled || protocol.ugadayka.length !== 3)
            return;
        if (this.blackWins(protocol)) {
            players.forEach((player: PlayerEntry) => {
                if (protocol.ugadayka.includes(player.index) && this.isBlack(player)) {
                    if (this.ratingSystemConsts.ugadaykaCheckAsAdditional) {
                        player.additionalScore += this.ratingSystemConsts.blackUgadaykaBonus;
                    } else {
                        player.mainScore += this.ratingSystemConsts.blackUgadaykaBonus;
                    }
                }
            });
        } else if (this.redWins(protocol)) {
            players.forEach((player: PlayerEntry) => {
                if (protocol.ugadayka.includes(player.index) && this.isRed(player)) {
                    if (this.ratingSystemConsts.ugadaykaCheckAsAdditional) {
                        player.additionalScore += this.ratingSystemConsts.redUgadaykaBonus;
                    } else {
                        player.mainScore += this.ratingSystemConsts.redUgadaykaBonus;
                    }
                }
            });
        }
    }

    private checkFirstKill(protocol: IProtocol, players: PlayerEntry[]) {
        if (!protocol.killedAtNight[0])
            return;
        const don = players.find(t => { return t.role.role === Roles.Дон });
        const sheriff = players.find((player: PlayerEntry) => { return player.role.role === Roles.Шериф });
        if (!don || !sheriff)
            return;
        if (this.blackWins(protocol) && protocol.killedAtNight[0] === sheriff.index && this.ratingSystemConsts.donGetsBonusForSheriffFirstKill) {
            if (this.ratingSystemConsts.donFirstKillBonusAsAdditional) {
                don.additionalScore += this.ratingSystemConsts.firstKillDonBonus;
            } else {
                don.mainScore += this.ratingSystemConsts.firstKillDonBonus;
            }
        }
        if (protocol.sheriffFirstKilled && this.blackWins(protocol) && this.ratingSystemConsts.sheriffGetsBonusIfFirstKilled) {
            if (this.ratingSystemConsts.sheriffFirstKillBonusAsAdditional) {
                sheriff.additionalScore += this.ratingSystemConsts.firstKillSheriffBonus;
            } else {
                sheriff.mainScore += this.ratingSystemConsts.firstKillSheriffBonus;
            }
        }
    }

    private checkBestPlayers(players: PlayerEntry[]) {
        const firstBest = players.find(t => { return t.bestPlayer.value === BestPlayers.Best1; });
        const secondBest = players.find(t => { return t.bestPlayer.value === BestPlayers.Best2; });
        const thirdBest = players.find(t => { return t.bestPlayer.value === BestPlayers.Best3; });
        if (firstBest) {
            if (this.ratingSystemConsts.bestPlayerBonusAsAdditional) {
                firstBest.additionalScore += this.ratingSystemConsts.firstBestBonus;
            } else {
                firstBest.mainScore += this.ratingSystemConsts.firstBestBonus;
            }
        }
        if (secondBest) {
            if (this.ratingSystemConsts.bestPlayerBonusAsAdditional) {
                secondBest.additionalScore += this.ratingSystemConsts.secondBestBonus;
            } else {
                secondBest.mainScore += this.ratingSystemConsts.secondBestBonus;
            }
        }
        if (thirdBest) {
            if (this.ratingSystemConsts.bestPlayerBonusAsAdditional) {
                thirdBest.additionalScore += this.ratingSystemConsts.thirdBestBonus;
            } else {
                thirdBest.mainScore += this.ratingSystemConsts.thirdBestBonus;
            }
        }
    }

    private checkFalseCom(protocol: IProtocol, players: PlayerEntry[]) {
        if (!protocol.falseSheriff || !this.blackWins(protocol))
            return;
        const falseCom = players.find(t => { return t.index === protocol.falseSheriff; });
        if (!falseCom)
            return;
        if (this.ratingSystemConsts.falseComBonusAsAdditional) {
            falseCom.additionalScore += this.ratingSystemConsts.falseComBonus;
        } else {
            falseCom.mainScore += this.ratingSystemConsts.falseComBonus;
        }
    }

    private foulCheck(players: PlayerEntry[]) {
        players.forEach((player: PlayerEntry) => {
            if (player.foul === 4) {
                if (this.ratingSystemConsts.clearBannedResults) {
                    player.additionalScore = 0;
                    player.mainScore = 0;
                }
                if (this.ratingSystemConsts.banBonusAsAdditional) {
                    player.additionalScore += this.ratingSystemConsts.bannedBonus;
                } else {
                    player.mainScore += this.ratingSystemConsts.bannedBonus;
                }
            }
        });
    }

    private countSumResult(players: PlayerEntry[]) {
        players.forEach(t => {
            t.result = t.mainScore + t.additionalScore;
        });
    }

    private redWins(protocol: IProtocol): boolean {
        return parseInt(protocol.winner.toString()) === Teams.Red;
    }

    private blackWins(protocol: IProtocol): boolean {
        return parseInt(protocol.winner.toString()) === Teams.Black;
    }

    private isBlack(player: PlayerEntry): boolean {
        return player.role && (player.role.role === Roles.Дон || player.role.role === Roles.Мафія);
    }

    private isRed(player: PlayerEntry): boolean {
        return player.role && (player.role.role === Roles.Мирний || player.role.role === Roles.Шериф);
    }
}