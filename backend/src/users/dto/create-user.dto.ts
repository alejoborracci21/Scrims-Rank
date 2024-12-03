export class CreateUserDto {
  name: string;
  nickname: string;
  email: string;
  password: string;
  points?: number; // Opcional
  scrims?: number; // Opcional
  duels?: number; // Opcional
  image?: string | null; // Opcional: puede ser un string (URL) o null
}