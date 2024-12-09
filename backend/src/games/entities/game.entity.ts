import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('games') // Nombre de la tabla
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: 'simple-array' })
  team1: string[];

  @Column({ type: 'simple-array' })
  team2: string[];

  @Column()
  game_date: Date;

  @Column({ length: 20 })
  game_type: string;

  @Column( {nullable: true, default: null } )
  winner_team: string;
}
