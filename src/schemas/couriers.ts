
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourierDocument = Courier & Document;

@Schema()
export class Courier {
    
    @Prop()
     name: string
    @Prop()
     counter: number
    @Prop()
     viechle: string
     @Prop()
    date: string
    @Prop()
     revenue: number
    
}

export const CourierSchema = SchemaFactory.createForClass(Courier);