import { Injectable, BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { In } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    const email = await this.userRepository.findOne({where: {email: createUserDto.email}});
    const nick = await this.userRepository.findOne({where: {nickname: createUserDto.nickname}});

    if (email || nick) throw new Error("User already exists");

    const saltRounds = 10; // Número de rondas de sal

    // Encriptar la contraseña
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);
    } catch (err) {
      throw new Error('Error encriptando la contraseña');
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.userRepository.find();
  }

  // Método para verificar si los jugadores existen
  async validatePlayersExist(players: string[]): Promise<void> {
    if (!Array.isArray(players) || players.length === 0) {
      throw new BadRequestException('La lista de jugadores está vacía o no es válida.');
    }

    // Buscar jugadores en la base de datos por nickname usando el operador "IN"
    const existingPlayers = await this.userRepository.find({
      where: { nickname: In(players) },
    });

    // Verificar si todos los jugadores fueron encontrados
    if (existingPlayers.length !== players.length) {
      throw new BadRequestException('Uno o más jugadores no existen en la base de datos.');
    }
  }

  async findOne(id: number): Promise<Usuario> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByNickname(nickname: string): Promise<Usuario | undefined> {
    return await this.userRepository.findOne({ where: { nickname } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Usuario> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async login(usuario: Usuario): Promise<Usuario | null> {
    if (typeof usuario.email !== 'string' || typeof usuario.password !== 'string') {
      throw new Error("El email y la contraseña deben ser cadenas de texto.");
    }

    // Buscar usuario por email
    const user = await this.userRepository.findOne({ where: { email: usuario.email } });

    if (!user) {
      throw new Error("El usuario no existe");
    }

    // Validar la contraseña usando bcrypt
    const isPasswordValid = await bcrypt.compare(usuario.password, user.password); // user.password es el hash guardado

    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    // Devolver el usuario si todo es válido
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
