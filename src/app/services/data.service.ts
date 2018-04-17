import { MessageService } from './message.service';
import { MyTeamPlayer } from './../models/myteam-player.model';
import { MyTeam } from './../models/myteam.model';
import { MyTeamService } from './my-team.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Gameweek } from './../models/gameweek.model';
import { Team } from './../models/team.model';

import { MatchValueConstants } from './../constants/match_value_constants';
import { Player } from '../models/player.model';

@Injectable()
export class DataService {

  teams: Team[];
  players: any[];
  fixtures: any[];

  constructor(
    private http: Http,
    private myTeamService: MyTeamService,
    private messageService: MessageService) { }

  fetchData(endpoint: string) {
    const uri = 'http://localhost:4000/' + endpoint + '/';
    return this.http.get(uri)
      .map(
        (response: Response) => {
          const fetchedData = response.json();
          return fetchedData;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Error occured while getting data!');
        }
      );
  }

  getPlayersForTeam(teamid: number) {
    const teamPlayers = [];
    for (const player of this.players) {
      if (player.club === teamid) {
        teamPlayers.push(player);
      }
    }
    return teamPlayers;
  }

  getFixturesForTeam(team) {
    const teamFixtures: Gameweek[] = [];
    for (const matchday of this.fixtures) {
      const gwName = matchday.name;
      const gwMatches = [];
      for (const match of matchday.matches) {
        const date = match.date;
        let place;
        let matchValue;
        let opponentName;
        if (team.key === match.team1.key) { // 'team' is playing at home
          place = 'home';
          opponentName = match.team2.code.toUpperCase();
          matchValue = this.calculateMatchValue(team, match.team2.key, place);
          gwMatches.push({
            date: date,
            place: place,
            opponent: opponentName,
            match_value: matchValue
          });
        }
        if (team.key === match.team2.key) { // 'team' is playing away
          place = 'away';
          opponentName = match.team1.code.toLowerCase();
          matchValue = this.calculateMatchValue(team, match.team1.key, place);
          gwMatches.push({
            date: date,
            place: place,
            opponent: opponentName,
            match_value: matchValue
          });
        }
      }
      teamFixtures.push(new Gameweek(gwName, gwMatches));
    }
    return teamFixtures;
  }

  calculateMatchValue(team, opponentKey, place) {
    const opponent = this.getTeamByKey(opponentKey);
    // opponentValue: stoke = (8 - 5) * 2 = 6
    let matchValue = (MatchValueConstants.HELP_VALUE - opponent.level) * MatchValueConstants.MULTIPLIER;
    // (city: 1) - (stoke: 5) = -4
    const levelDifference = team.level - opponent.level;
    // matchValue: 6 + ( -4 * 0.5) = 6 - 2 = 4
    matchValue = matchValue + (levelDifference * MatchValueConstants.DIFFERENCE_MULTIPLIER);

    if (place === 'home') {
      matchValue = matchValue * MatchValueConstants.HOME_IMPACT; // 4 * 0.8 = 3.2
    }

    if (place === 'away') {
      matchValue = matchValue * MatchValueConstants.AWAY_IMPACT; // 4 * 1.2 = 4.8
    }

    return matchValue;
  }

  getTeamByKey(key) {
    for (const team of this.teams) {
      if (team.key === key) {
        return team;
      }
    }
    return null;
  }

  getNextGameweek() {
    const today = new Date();
    for (const gw of this.fixtures) {
      const gwName = gw.name;
      for (const match of gw.matches) {
        if (new Date(match.date) > today) {
          return gwName;
        }
      }
    }
    return 'end of season';
  }

  generateTeams(dataTeams: any[]) {
    this.teams = [];
    // fixtures are fetched when this function is called
    for (const dataTeam of dataTeams) {
      const teamDetail: Team = new Team(dataTeam.key, dataTeam.name, dataTeam.code, dataTeam.level,
        dataTeam.color, dataTeam.color_text, dataTeam.logo);
      this.teams.push(teamDetail);
    }

    this.initializePlayersAndMyTeam('gzandhustlas');

    for (const team of this.teams) {
      const teamFixtures = this.getFixturesForTeam(team);
      team.setFixtures(teamFixtures);
    }
  }

  initializePlayersAndMyTeam(myTeamCode: string) {

    this.fetchData('players').subscribe(
      (dataPlayers) => {
        console.log(dataPlayers);
        for (const dataPlayer of dataPlayers) {
          // const teamForPlayer: Team = new Team();
          const player: Player = new Player(dataPlayer._id, dataPlayer.name, dataPlayer.position);

          for (const team of this.teams) {
            if (dataPlayer.team[0].key === team.key) {
              team.addPlayer(player);
            }
          }
        }

        this.selectMyTeam(myTeamCode);

      },
      (error) => console.log(error)
    );

  }

  selectMyTeam(myTeamCode: string) {
    this.fetchData('myteam/' + myTeamCode).subscribe(
      (dataMyTeams) => {
        console.log(dataMyTeams);
        const dataMyTeam = dataMyTeams[0];
        const myteam: MyTeam = new MyTeam(dataMyTeam.name, dataMyTeam.code,
          dataMyTeam.primary_color, dataMyTeam.secondary_color);

        for (const dPlayer of dataMyTeam.players) {
          const myTeamPlayer: MyTeamPlayer = this.getMyTeamPlayerById(dPlayer.player_id,
            dPlayer.first_team, dPlayer.captain);

          myteam.addPlayer(myTeamPlayer);
        }

        this.myTeamService.myTeam = myteam;
        console.log(this.myTeamService.myTeam);
        this.messageService.sendMessage('MyTeam is initialized');
      },
      (err) => console.log(err)
    );
  }

  getMyTeamPlayerById(playerid: number, first_team: boolean, captain: boolean): MyTeamPlayer {

    for (const team of this.teams) {
      for (const player of team.players) {
        if (player.id === playerid) {
          return new MyTeamPlayer(player, team, first_team, captain);
        }
      }
    }
    return null;
  }

  generateGameweekStringForView(fixture: Gameweek): string {
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

}
