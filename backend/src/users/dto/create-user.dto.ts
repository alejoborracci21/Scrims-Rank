import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @Length(2, 20)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(5, 20)
    password: string;
}
