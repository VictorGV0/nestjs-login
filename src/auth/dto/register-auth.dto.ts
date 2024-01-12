import { PartialType } from "@nestjs/swagger";
import { LoginAuthDTO } from "./login-auth.dto";
import { IsNotEmpty } from "class-validator";

export class RegisterAuthDTO extends PartialType(LoginAuthDTO) {
    @IsNotEmpty()
    name: string;

}