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

  @Column({nullable: true, default: 0})
  scrims: number;

  @Column({nullable: true, default: 0})
  duels: number;

  @Column({nullable: true, default: 0})
  points: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: "https://static.vecteezy.com/system/resources/previews/027/728/804/non_2x/faceless-businessman-user-profile-icon-business-leader-profile-picture-portrait-user-member-people-icon-in-flat-style-circle-button-with-avatar-photo-silhouette-free-png.png" })
  image: string | null; 
 
}
