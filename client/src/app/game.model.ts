export class Game {

    constructor(votes_needed: number) {
        this.votes_needed = votes_needed;
        this.options = [];
    }
    votes_needed: number;
    options: { option_id: string, votes: number }[];
}