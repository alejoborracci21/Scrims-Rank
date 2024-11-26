import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { throwError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Usuario> {

    const saltRounds = 10; // Número de rondas de sal

    // Encriptar la contraseña
    try {
        createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);
    } catch (err) {
        console.error('Error encriptando la contraseña:', err);
        throw new Error('Error encriptando la contraseña');
    }

    // Crear y guardar el usuario
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Usuario> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async login(email : string, password : string): Promise<Usuario>|null {
    console.log(email, password)
    const user = await this.userRepository.findOne({where: {email}})
    console.log(user.email, user.password)
       if (!user){
       throw new Error("El usuario no existe")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
      throw new Error("Contraseña incorrecta")
    }

    return user
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
