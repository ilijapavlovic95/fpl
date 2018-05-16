import { Team } from './../../models/team.model';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fpl-teams-aside',
  templateUrl: './teams-aside.component.html',
  styleUrls: ['./teams-aside.component.css']
})
export class TeamsAsideComponent implements OnInit {

  @Input() teams: Team[];
  sortedTeams: Team[];
  players = [];
  fixtures;

  teamChooserStatus: string;

  constructor(private dataService: DataService) {
    this.teamChooserStatus = 'start';
  }

  ngOnInit() {
    console.log(this.teams);
    this.dataService.fetchData('fixtures').subscribe(
      (data) => {
        this.dataService.fixtures = data;
        this.fixtures = data;
      },
      (error) => console.log(error)
    );
    this.sortedTeams = this.teams;
  }

  toggleTeamChooser() {
    if (this.teamChooserStatus === 'start') {
      this.teamChooserStatus = 'hidden';
    } else if (this.teamChooserStatus === 'visible') {
      this.teamChooserStatus = 'hidden';
    } else if (this.teamChooserStatus === 'hidden') {
      this.teamChooserStatus = 'visible';
    }
  }

  // selectPlayers(team) {
  //   this.players = this.dataService.getPlayersForTeam(team);
  //   console.log(this.players);
  // }

  generateGameweekNames(numberOfGameweeks: number) {
    const gwNames = [];
    const nextGW: string = this.dataService.getNextGameweek();
    const gwIndex = Number(nextGW.split(' ')[1]); // gameweek 34 -> 34
    const topIndex = gwIndex + numberOfGameweeks > 39 ? 39 : gwIndex + numberOfGameweeks;
    for (let index = gwIndex; index < topIndex; index++) {
      const gwName = 'GW' + index;
      gwNames.push(gwName);
    }
    return gwNames;
  }

  sortTeamsByGameweek(gwName: string /* GW35 */): void {
    const gwIndex: number = Number(gwName.slice(2)) - 1;
    this.sortedTeams.sort((team1, team2) => {

      let value1 = 0;
      let value2 = 0;

      const numberOfMatches1 = team1.fixtures[gwIndex].matches.length;
      const numberOfMatches2 = team2.fixtures[gwIndex].matches.length;

      if (numberOfMatches1 === 1) {
        value1 = team1.fixtures[gwIndex].matches[0].match_value;
      }

      if (numberOfMatches2 === 1) {
        value2 = team2.fixtures[gwIndex].matches[0].match_value;
      }

      if (numberOfMatches1 === 2) {
        value1 = (team1.fixtures[gwIndex].matches[0].match_value + team1.fixtures[gwIndex].matches[1].match_value) / 2;
      }

      if (numberOfMatches2 === 2) {
        value2 = (team2.fixtures[gwIndex].matches[0].match_value + team2.fixtures[gwIndex].matches[1].match_value) / 2;
      }

      if (numberOfMatches1 - numberOfMatches2 === 0) {
        return value1 - value2; // < 0 - asceding
      }
      return numberOfMatches2 - numberOfMatches1;
    });

    console.log(this.sortedTeams);
  }

  sortTeamsBySumValue() {
    this.sortedTeams.sort((team1, team2) => {
      const sum1 = Number(this.dataService.calculateNextMatchesValue(5, team1).avg_value_per_match);
      const sum2 = Number(this.dataService.calculateNextMatchesValue(5, team2).avg_value_per_match);
      return sum1 - sum2;
    });
  }

}
