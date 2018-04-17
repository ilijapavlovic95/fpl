import { Positions } from './../../constants/positions';
import { MyTeamPlayer } from './../../models/myteam-player.model';
import { Component, OnInit } from '@angular/core';
import { MyTeamService } from './../../services/my-team.service';
import { DataService } from './../../services/data.service';
import { MyTeam } from './../../models/myteam.model';

@Component({
    selector: 'fpl-formation',
    templateUrl: './formation.component.html',
    styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

    myteam: MyTeam;

    constructor(private dataService: DataService, private myteamService: MyTeamService) { }

    ngOnInit(): void {
        this.myteam = this.myteamService.myTeam;
        console.log(this.myteam);
    }

    getPlayersOnPosition(position: string): MyTeamPlayer[] {
        let positionId: number;
        if (position === 'gk') { positionId = Positions.GOALKEEPER; }
        if (position === 'def') { positionId = Positions.DEFENDER; }
        if (position === 'mid') { positionId = Positions.MIDFIELDER; }
        if (position === 'att') { positionId = Positions.ATTACKER; }

        const players: MyTeamPlayer[] = [];
        for (const fplplayer of this.myteam.players) {
            if (fplplayer.detail.position === positionId) {
                players.push(fplplayer);
            }
        }

        return players;
    }
}
