import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeliveryDocument = Delivery & Document;

@Schema()
export class Delivery {
  @Prop()
  id: number;
  @Prop()
  packageSize: number;
  @Prop()
  cost: number;
  @Prop()
  description: string;
  @Prop()
  date: string;

  @Prop()
  courier: string;
  @Prop()
  sender: string;

  @Prop()
  assigned: boolean;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
