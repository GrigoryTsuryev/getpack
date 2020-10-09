import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeliveryDocument } from 'src/schemas/delivery';
import { Delivery } from '../schemas/delivery';
import { CreateDeliveryDTO } from './dto/create-delivery-dto';

@Injectable()
export class DeliveryService {
    constructor(@InjectModel('deliveries') private readonly deliveryModule: Model<DeliveryDocument>) { }

    async   addDelivery(deliveryDto: CreateDeliveryDTO): Promise<Delivery> {
        const createdDelivery = new this.deliveryModule(deliveryDto);
        return createdDelivery.save();
      }

      async findAllCourierDeliveryByDate(date: string, type: string, username: string): Promise<Delivery[]> {
        const documents = await this.deliveryModule.find({type, username});
        const result =  documents.filter(document => document.date < date)
        return result
      }

      async findAllSenderDeliveryByDate(date: string, type: string): Promise<Delivery[]> {
        const documents = await this.deliveryModule.find({type});
        const result =  documents.filter(document => document.date < date)
        return result
      }

      async assignDelivery(courier: string, id: number): Promise<Delivery> {
        return  this.deliveryModule.updateOne({ id}, {
           courier
        });
      }
      

}
