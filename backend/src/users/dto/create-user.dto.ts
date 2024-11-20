export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    points?: number; // Opcional
    scrims?: number; // Opcional
    duelos?: number; // Opcional
  }
  