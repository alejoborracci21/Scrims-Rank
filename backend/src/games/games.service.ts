import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ){}


 async create(createGameDto: CreateGameDto) {
    const newGame = this.gameRepository.create(createGameDto);
    return await this.gameRepository.save(newGame);
  }

  async findAll(): Promise <Game[]> {
     return await this.gameRepository.find();
  }

  async findOne(id: number) : Promise <Game> {
    return await this.gameRepository.findOne({where:{id}});
  }

  async remove(id: number) {
    return await this.gameRepository.delete(id);
  }
}
