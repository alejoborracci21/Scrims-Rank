import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @ApiProperty({ description: 'The nickname of the user' })
  nickname: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @ApiProperty({ description: 'The image of the user' })
  image: string;

  @ApiProperty({ description: 'The scrims wins of the user' })
  scrims: number;

  @ApiProperty({ description: 'The duels wins of the user' })
  duels: number;

  @ApiProperty({ description: 'The points of the user' })
  points: number;
}