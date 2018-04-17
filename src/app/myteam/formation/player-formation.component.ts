import { MessageService } from './../../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { Gameweek } from './../../models/gameweek.model';
import { DataService } from './../../services/data.service';
import { MyTeamPlayer } from './../../models/myteam-player.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'fpl-player-formation',
  templateUrl: './player-formation.component.html',
  styleUrls: ['./player-formation.component.css']
})
export class PlayerFormationComponent implements OnInit, OnDestroy {

  @Input() player: MyTeamPlayer;
  currentGW: Gameweek;

  subscription: Subscription;

  constructor(private dataService: DataService, private messageService: MessageService) { }

  ngOnInit() {
    this.currentGW = this.getGameweek(Number(this.dataService.getNextGameweek().split(' ')[1]));
    this.subscription = this.messageService.getSubject().subscribe(
      (gwMessage) => {
        this.currentGW = this.getGameweek(gwMessage.gameweek);
      }
    );
  }

  getTeamBackground(): string {
    return this.player.team.color;
  }

  getTeamLogoSrc(): string {
    return '../../../assets/logos/' + this.player.team.code.toLowerCase() + '.png';
  }

  generateFixtureStringForView() {
    return this.dataService.generateGameweekStringForView(this.currentGW);
  }

  getGameweek(gwOrder: number): Gameweek {
    return this.player.team.fixtures[gwOrder - 1];
  }

  getPlayerDivOpacity(): number {
    if (this.player.first_team) {
      return 1;
    }
    return 0.2;
  }

  switchFirstTeam(): void {
    this.player.first_team = !this.player.first_team;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
