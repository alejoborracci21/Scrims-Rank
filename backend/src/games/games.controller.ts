import { Controller, Get, Post, Body, Param, Delete, BadRequestException } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UsersService } from 'src/users/users.service';

@Controller('games')
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly usersService: UsersService, // Inyectar el servicio de usuarios
  ) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    const { team1, team2 } = createGameDto;

    // Validar que todos los IDs de jugadores existan
    const allPlayers = [...team1, ...team2];
    await this.usersService.validatePlayersExist(allPlayers);

    // Crear el juego después de validar los jugadores
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
