import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('games') // Nombre de la tabla
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { array: true })
  team1: number[];

  @Column('int', { array: true })
  team2: number[];

  @Column()
  game_date: Date;

  @Column({ length: 20 })
  game_type: string;

  @Column({ type: 'smallint', nullable: true, default: null })
  winner_team: number;
}
