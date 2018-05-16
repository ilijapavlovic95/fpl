import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MyTeamPlayer } from '../../models/myteam-player.model';

@Component({
  selector: 'fpl-player-options-dialog',
  templateUrl: './player-options-dialog.component.html',
  styleUrls: ['./player-options-dialog.component.css']
})
export class PlayerOptionsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlayerOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public player: MyTeamPlayer) { }

  ngOnInit() {
  }

  closeDialog(message: string): void {
    this.dialogRef.close(message);
  }

}
