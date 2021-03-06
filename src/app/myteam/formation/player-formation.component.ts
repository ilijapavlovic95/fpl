import { PlayerChooserDialogComponent } from './player-chooser-dialog.component';
import { MessageService } from './../../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { Gameweek } from './../../models/gameweek.model';
import { DataService } from './../../services/data.service';
import { MyTeamPlayer } from './../../models/myteam-player.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PlayerOptionsDialogComponent } from './player-options-dialog.component';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fpl-player-formation',
  templateUrl: './player-formation.component.html',
  styleUrls: ['./player-formation.component.css']
})
export class PlayerFormationComponent implements OnInit, OnDestroy {

  @Input() player: MyTeamPlayer;
  currentGW: Gameweek;

  subscription: Subscription;

  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private playerOptionsDialog: MatDialog,
    private playerChooserDialog: MatDialog) { }

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

  openDialog(): void {
    const dialogRef = this.playerOptionsDialog.open(PlayerOptionsDialogComponent, {
      width: '500px',
      height: '280px',
      data: this.player
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result === 'player-first-team') {
          this.player.first_team = !this.player.first_team;
        }
        if (result === 'player-captain') {
          this.player.captain = !this.player.captain;
        }
        if (result === 'change-player') {
          this.openPlayerChooserDialog();
        }
      }
    );
  }

  captainString(): string {
    return this.player.captain ? '(C)' : '';
  }

  openPlayerChooserDialog(): void {
    const dialogRef = this.playerChooserDialog.open(PlayerChooserDialogComponent, {
      width: '600px',
      height: '500px',
      data: this.player.detail
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        this.player = this.dataService.findPlayerFromTransferDialog(result.playerIn);
        this.currentGW = this.getGameweek(Number(this.currentGW.name.split(' ')[1]));
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
