import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })  // Describe la operación
  @ApiResponse({ status: 200, description: 'Successful user created' })  // Documenta la respuesta
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })  // Describe la operación
  @ApiResponse({ status: 200, description: 'Loged' })  // Documenta la respuesta
  async login(@Body() Usuario){
    return await this.usersService.login(Usuario)
  }

  @Get()
  @ApiOperation({ summary: 'Search all users' })  // Describe la operación
  @ApiResponse({ status: 200, description: 'Successful' })  // Documenta la respuesta
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })  // Describe la operación
  @ApiResponse({ status: 200, description: 'Successful get user' })  // Documenta la respuesta
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Get('nickname/:nickname')
  @ApiOperation({ summary: 'Search user by nickname' })  // Describe la operación
  @ApiResponse({ status: 200, description: 'Successful get user' })  // Documenta la respuesta
  async findByNickname(@Param('nickname') nickname: string) {
    const user = await this.usersService.findOneByNickname(nickname);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })  // Describe la operación
  @ApiResponse({ status: 200, description: 'Successful user updated' })  // Documenta la respuesta
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })  // Describe la operación
  @ApiResponse({ status: 200, description: 'Successful delete user' })  // Documenta la respuesta
  async remove(@Param('id') id: number) {
    return await this.usersService.remove(id);
  }
}
