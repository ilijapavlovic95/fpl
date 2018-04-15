import { MyTeamPlayer } from './myteam-player.model';
import { Player } from './player.model';
export class MyTeam {
    public name: string;
    public code: string;
    public players: MyTeamPlayer[];
    public primary_color: string;
    public secondary_color: string;

    constructor(name, code, primary_color, secondary_color) {
        this.name = name;
        this.code = code;
        this.players = [];
        this.primary_color = primary_color;
        this.secondary_color = secondary_color;
    }

    public addPlayer(myteamPlayer: MyTeamPlayer) {
        this.players.push(myteamPlayer);
    }

}
