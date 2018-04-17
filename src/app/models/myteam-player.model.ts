import { Team } from './team.model';
import { Player } from './player.model';
export class MyTeamPlayer {
    public detail: Player;
    public team: Team;
    public first_team: boolean;
    public captain: boolean;

    constructor(player: Player, team: Team, first_team: boolean, captain: boolean) {
        this.team = team;
        this.detail = player;
        this.captain = captain;
        this.first_team = first_team;
    }
}
