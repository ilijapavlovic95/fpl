import { MessageService } from './../services/message.service';
import { MyTeam } from './../models/myteam.model';
import { MyTeamService } from './../services/my-team.service';
import { Gameweek } from './../models/gameweek.model';
import { Team } from './../models/team.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './../services/data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fpl-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit, OnDestroy {

  teams: Team[];
  myteam: MyTeam;

  subscription: Subscription;
  loadingFinished: boolean;

  constructor(private dataService: DataService, private myteamService: MyTeamService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadingFinished = false;

    this.dataService.fetchData('fixtures').subscribe(
      (dataFixtures) => {
        this.dataService.fixtures = dataFixtures;
        this.dataService.fetchData('teams').subscribe(
          (dataTeams) => {
            this.dataService.generateTeams(dataTeams);
            this.teams = this.dataService.teams;

            this.myteam = this.myteamService.myTeam;
            console.log(this.teams);
          },
          (err) => console.log(err)
        );
        console.log(this.dataService.fixtures);
      },
      (error) => console.log(error)
    );

    this.subscription = this.messageService.getMessage().subscribe(
      (message) => {
        console.log(message);
        this.myteam = this.myteamService.myTeam;
        console.log(this.myteamService.myTeam);
        this.loadingFinished = true;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
