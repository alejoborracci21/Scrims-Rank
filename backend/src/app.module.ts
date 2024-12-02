import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    GamesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: { rejectUnauthorized: false }, 
      extra: {
        max: 5, // Reduce el número máximo de conexiones simultáneas
      },
    }),
  ],
})
export class AppModule {}
