import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [UsersModule, GamesModule,TypeOrmModule.forRoot({
    type: 'postgres',               
    host: 'localhost',              
    port: 5433,                      
    username: 'postgres',          
    password: '29demarzo',       
    database: 'postgres',   
    entities: [__dirname + '/**/*.entity{.ts,.js}'], 
    synchronize: true,               
  }),],
})
export class AppModule {}
