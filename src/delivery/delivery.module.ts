import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourierModule } from 'src/courier/courier.module';
import { DeliverySchema } from './../schemas/delivery';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'deliveries', schema: DeliverySchema }]),
    CourierModule,
  ],
  providers: [DeliveryService],
  exports: [DeliveryService],
  controllers: [DeliveryController],
})
export class DeliveryModule {}
