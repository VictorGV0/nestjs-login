import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TokenDocument = Token & Document;


@Schema()
export class Token{

    @Prop({unique:true})
    email: string;

    @Prop()
    token: string;

    @Prop()
    createdAt: Date;

}

export const TokenSchema = SchemaFactory.createForClass(Token);