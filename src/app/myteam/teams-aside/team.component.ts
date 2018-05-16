import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Team } from './../../models/team.model';
import { Gameweek } from './../../models/gameweek.model';

@Component({
    selector: 'fpl-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

    @Input() team: Team;
    @Output() teamClicked = new EventEmitter<Object>();

    // nextMatchesArray: any[]; trebalo bi ove ispod f-je sve prebaciti u dataService !

    constructor(public dataService: DataService) { }

    ngOnInit(): void {
        // this.dataService.fetchData('fixtures').subscribe(
        //     (data) => {
        //         this.dataService.fixtures = data;
        //         this.teamFixtures = this.dataService.getFixturesForTeam(this.team);
        //     },
        //     (error) => console.log(error)
        // );
    }

    emitTeamClicked() {
        this.teamClicked.emit(this.team);
    }

    generateNextMatchesArray(numberOfGameweeks: number) {
        return this.dataService.generateNextMatchesArray(numberOfGameweeks, this.team);
    }

    generateStringForView(fixture: Gameweek) {
        return this.dataService.generateGameweekStringForView(fixture);
    }

    calculateNextMatchesValue(numberOfGameweeks: number) {
        return this.dataService.calculateNextMatchesValue(numberOfGameweeks, this.team);
    }
}
