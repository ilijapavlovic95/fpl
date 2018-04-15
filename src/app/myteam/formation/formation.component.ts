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
}
