import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ItemsDocument = Items & Document;

@Schema()
export class Items{
    @Prop()
    name: string;
    @Prop()
    price: string;
    @Prop()
    description: string;
}

export const ItemsSchema = SchemaFactory.createForClass(Items);