export class CreateGameDto {
    team1: Array<number>;
    team2: Array<number>;
    date: Date;
    winner: string;
    type: string;
}
