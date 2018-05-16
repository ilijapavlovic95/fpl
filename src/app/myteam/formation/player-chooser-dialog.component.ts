import { MyTeamPlayer } from './../../models/myteam-player.model';
import { Gameweek } from './../../models/gameweek.model';
import { Team } from './../../models/team.model';
import { DataService } from './../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Player } from '../../models/player.model';

@Component({
    selector: 'fpl-player-chooser-dialog',
    templateUrl: './player-chooser-dialog.component.html',
    styleUrls: ['./player-chooser-dialog.component.css']
})
export class PlayerChooserDialogComponent implements OnInit {

    teams: Team[];
    players: any[];

    sortedPlayers: any[] = [];
    pinnedPlayers: any[] = [];

    // playerOut: any; - injection
    playerIn: any = { id: 0, name: '', team: { code: '' } };

    constructor(
        public dialogRef: MatDialogRef<PlayerChooserDialogComponent>,
        public dataService: DataService,
        @Inject(MAT_DIALOG_DATA) public playerOut: any) { }

    ngOnInit(): void {
        this.teams = this.dataService.teams;
        console.log(this.teams);
        this.players = this.playersArr();
        console.log(this.players);
    }

    playersArr() {
        const players: any[] = [];
        for (const team of this.teams) {
            for (const player of team.players) {
                players.push({
                    id: player.id,
                    name: player.name,
                    team: team,
                    fixtures: this.dataService.generateNextMatchesArray(5, team)
                });
            }
        }
        return players;
    }

    onKeyUp(input: string) {
        input = input.toLowerCase();
        console.log(input);
        this.sortedPlayers = [];
        for (const player of this.players) {
            if (player.name.toLowerCase().startsWith(input) && !this.isPinned(player)) {
                this.sortedPlayers.push(player);
            }
        }
    }

    getTeamLogoSrc(player): string {
        return '../../../assets/logos/' + player.team.code.toLowerCase() + '.png';
    }

    generateFixtureForView(gameweek: Gameweek): string {
        return this.dataService.generateGameweekStringForView(gameweek);
    }

    pinPlayerOnTop(player, playerInput) {
        this.pinnedPlayers.push(player);
        playerInput.value = '';
        let j = 0;
        for (const playerEl of this.sortedPlayers) {
            if (player.id === playerEl.id) {
                this.sortedPlayers.splice(j, 1);
            }
            j++;
        }
    }

    unpinPlayer(player) {
        let j = 0;
        for (const playerEl of this.pinnedPlayers) {
            if (player.id === playerEl.id) {
                this.pinnedPlayers.splice(j, 1);
            }
            j++;
        }
    }

    isPinned(player): boolean {
        for (const playerEl of this.pinnedPlayers) {
            if (player.id === playerEl.id) {
                return true;
            }
        }
        return false;
    }

    getOpacity(player): number {
        if (this.isPinned(player)) {
            return 1;
        }
        return 0.4;
    }

    isSelected(player) {
        if (this.playerIn.id === player.id) {
            return true;
        }
        return false;
    }

    selectPlayerIn(player) {
        this.playerIn = player;
        console.log(this.playerIn);
    }

    getPlayerInString(): string {
        return this.playerIn.name + '(' + this.playerIn.team.code + ')';
    }

    confirmTransfer() {
        this.dialogRef.close({
            playerIn: this.playerIn,
            playerOut: this.playerOut
        });
    }
}
