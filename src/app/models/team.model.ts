import { Gameweek } from './gameweek.model';
import { Player } from './player.model';

export class Team {

    public key: string;
    public name: string;
    public code: string;
    public level: number;
    public color: string;
    public color_text: string;
    public logo: string;
    public fixtures: Gameweek[];
    public players: Player[];

    constructor(key, name, code, level, color, color_text, logo) {
        this.key = key;
        this.name = name;
        this.code = code;
        this.level = level;
        this.color = color;
        this.color_text = color_text;
        this.logo = logo;
        this.fixtures = [];
        this.players = [];
    }

    public setFixtures(fixtures: Gameweek[]) {
        this.fixtures = fixtures;
    }

    public addPlayer(player: Player) {
        this.players.push(player);
    }

}
