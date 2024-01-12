import { IsEmail, IsNotEmpty } from "class-validator";

export class TokenAuthDTO {

    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    token: string;
    
    @IsNotEmpty()
    createdAt: Date;
}