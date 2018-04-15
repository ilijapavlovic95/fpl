import { DataService } from './../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fpl-teams-aside',
  templateUrl: './teams-aside.component.html',
  styleUrls: ['./teams-aside.component.css']
})
export class TeamsAsideComponent implements OnInit {

  @Input() teams;
  sortedTeams;
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

  selectPlayers(team) {
    this.players = this.dataService.getPlayersForTeam(team);
    console.log(this.players);
  }

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

  sortTeams() {

  }

}
