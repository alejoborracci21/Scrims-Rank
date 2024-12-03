import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  nickname: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column()
  scrims: number;

  @Column()
  duels: number;

  @Column()
  points: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string | null; 
 
}
