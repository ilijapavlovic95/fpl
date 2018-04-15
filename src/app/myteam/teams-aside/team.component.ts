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
        const matchesArr = [];
        const nextGW: string = this.dataService.getNextGameweek();
        const gwIndex = Number(nextGW.split(' ')[1]) - 1; // gameweek 34 is at index 33
        const topIndex = gwIndex + numberOfGameweeks > 38 ? 38 : gwIndex + numberOfGameweeks;
        for (let index = gwIndex; index < topIndex; index++) {
            const fixture = this.team.fixtures[index];
            matchesArr.push(fixture);
        }
        return matchesArr;
    }

    generateStringForView(fixture: Gameweek) {
        if (fixture.matches.length === 0) {
            return ' / ';
        }
        if (fixture.matches.length === 1) {
            return fixture.matches[0].opponent;
        }
        if (fixture.matches.length === 2) {
            return fixture.matches[0].opponent + ', ' + fixture.matches[1].opponent;
        }
    }

    calculateNextMatchesValue(numberOfGameweeks: number) {
        const matchesArr = this.generateNextMatchesArray(numberOfGameweeks);
        let sumValue = 0;
        let countMatches = 0;
        matchesArr.forEach((gameweek: Gameweek) => {
            gameweek.matches.forEach(match => {
                sumValue += match.match_value;
                countMatches++;
            });
        });
        const calculatedValues = {
            sum_value: sumValue,
            matches_count: countMatches,
            avg_value_per_match: (sumValue / countMatches).toFixed(2)
        };
        return calculatedValues;
    }
}
