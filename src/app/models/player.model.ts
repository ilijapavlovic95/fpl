import { Positions } from './../constants/positions';
import { Team } from './team.model';
export class Player {
    public id: number;
    public name: string;
    public position: number;

    constructor(id: number, name: string, position: number) {
        this.id = id;
        this.name = name;
        this.position = position;
    }

    getPosition(): string {
        if (this.position === Positions.GOALKEEPER) {
            return 'Goalkeeper';
        }
        if (this.position === Positions.DEFENDER) {
            return 'Defender';
        }
        if (this.position === Positions.MIDFIELDER) {
            return 'Midfielder';
        }
        if (this.position === Positions.ATTACKER) {
            return 'Attacker';
        }
    }
}
