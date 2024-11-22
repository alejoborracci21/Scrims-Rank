import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/users/entities/user.entity';
import { Game } from './entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Game])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
