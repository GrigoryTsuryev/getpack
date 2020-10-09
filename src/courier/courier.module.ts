import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourierSchema } from 'src/schemas/couriers';
import { CourierController } from './courier.controller';
import { CourierService } from './courier.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'couriers', schema: CourierSchema }]),
  ],
  providers: [CourierService],
  exports: [CourierService],
  controllers: [CourierController],
})
export class CourierModule {}
