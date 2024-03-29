import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    price:number;

    @IsNotEmpty()
    @IsString()
    description:string;
}
