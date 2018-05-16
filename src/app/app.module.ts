import { PlayerChooserDialogComponent } from './myteam/formation/player-chooser-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { MyteamComponent } from './myteam/myteam.component';
import { TeamComponent } from './myteam/teams-aside/team.component';
import { PlayerComponent } from './myteam/teams-aside/player.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormationComponent } from './myteam/formation/formation.component';
import { TeamsAsideComponent } from './myteam/teams-aside/teams-aside.component';
import { MyTeamService } from './services/my-team.service';
import { DataService } from './services/data.service';
import { PlayerFormationComponent } from './myteam/formation/player-formation.component';
import { PlayerOptionsDialogComponent } from './myteam/formation/player-options-dialog.component';
import { MessageService } from './services/message.service';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MyteamComponent,
    NavigationComponent,
    FormationComponent,
    TeamsAsideComponent,
    TeamComponent,
    PlayerComponent,
    PlayerFormationComponent,
    PlayerOptionsDialogComponent,
    PlayerChooserDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    PlayerOptionsDialogComponent,
    PlayerChooserDialogComponent
  ],
  providers: [
    DataService,
    MyTeamService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
