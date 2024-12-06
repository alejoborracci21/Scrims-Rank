import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Usuario } from './entities/user.entity';
import { Game } from 'src/games/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Game])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exportar el servicio para usarlo en otros módulos
})
export class UsersModule {}
