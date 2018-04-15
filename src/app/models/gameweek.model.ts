export class Gameweek {

    public name: string;
    public matches: {
        date: Date,
        place: string,
        opponent: string,
        match_value: number
    }[];

    constructor(name, matches) {
        this.name = name;
        this.matches = matches;
    }
}
