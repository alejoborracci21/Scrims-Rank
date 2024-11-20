import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [UsersModule, GamesModule,TypeOrmModule.forRoot({
    type: 'postgres',                // Tipo de base de datos
    host: 'localhost',               // Dirección del servidor de la base de datos
    port: 5433,                      // Puerto de PostgreSQL (por defecto 5432)
    username: 'postgres',          // Nombre de usuario de tu base de datos
    password: '29demarzo',       // Contraseña del usuario
    database: 'postgres',   // Nombre de la base de datos
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ruta a las entidades
    synchronize: true,               // Sincroniza la estructura de las tablas (solo para desarrollo)
  }),],
})
export class AppModule {}
