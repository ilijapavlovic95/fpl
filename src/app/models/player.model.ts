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
}
