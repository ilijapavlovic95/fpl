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
import { MessageService } from './services/message.service';


@NgModule({
  declarations: [
    AppComponent,
    MyteamComponent,
    NavigationComponent,
    FormationComponent,
    TeamsAsideComponent,
    TeamComponent,
    PlayerComponent,
    PlayerFormationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    DataService,
    MyTeamService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
