import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginAuthDTO {

    @IsEmail()
    email: string;

    @MinLength(4)
    @MaxLength(50)
    password: string;
}